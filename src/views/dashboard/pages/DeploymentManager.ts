import { WorkflowBuilder, WStep, Transition } from 'mdv-workflow-client-types';
import { EditorStorage } from './EditorStorage';
import { ethers, Wallet, EventFilter } from 'ethers';
import { SolidoSingleton } from '../components/core/SolidoSingleton';
const WTemplateABI = require('../../../libs/contracts/WTemplate');


export class DeploymentManager {
    public systemLibs: any = {};
    constructor(public location: string) {
    }

    async fromHttp(name: string) {
        const u = `/contracts/${name}`;
        const res = await fetch(u);
        return res.text();
    }


    public async versions() {
        const v = await fetch(`https://raw.githubusercontent.com/ethereum/solc-bin/gh-pages/bin/list.txt`);
        const txt = await v.text();
        return txt.split('\n').map(i => ({ key: i, value: i }))
    }
    public async getSources(version: string, sol: string) {
        return new Promise(async (resolve, reject) => {
            const RLPReaderSol = await this.fromHttp('RLPReader/RLPReader.sol');
            const LibRecetaDocumentSol = await this.fromHttp('examples/LibRecetaDocument.sol');
            const IWModelSol = await this.fromHttp('IWModel.sol');
            const WFStorageSol = await this.fromHttp('WFStorage.sol');
            const WModelsSol = await this.fromHttp('WModels.sol');
            const WStepSol = await this.fromHttp('WStep.sol');
            const IExtensionSol = await this.fromHttp('IExtension.sol');
            const ExtensionEventRegistrySol = await this.fromHttp('ExtensionEventRegistry.sol');
            const RecetaModel = await this.fromHttp('examples/RecetaModel.sol');
            const sources = {
                'ModelTemplate.sol': { content: sol },
            }
            const libs = {
                'WStep.sol': { content: WStepSol },
                'IExtension.sol': { content: IExtensionSol },
                'ExtensionEventRegistry.sol': { content: ExtensionEventRegistrySol },
                'WModels.sol': { content: WModelsSol },
                'WFStorage.sol': { content: WFStorageSol },
                'IWModel.sol': { content: IWModelSol },
                // 'RecetaModel.sol': { content: RecetaModel },
                'LibRecetaDocument.sol': { content: LibRecetaDocumentSol },
                'RLPReader.sol': { content: RLPReaderSol },
                'RLPReader/RLPReader.sol': { content: RLPReaderSol },
            }

            const input = {
                language: 'Solidity',
                sources,
                settings: {
                    outputSelection: {
                        '*': {
                            '*': ['abi', 'evm.bytecode']
                        }
                    }
                }
            }
            this.systemLibs = libs;
            resolve(input);
        });
    }

    public static async    createUserAccess({ templateAddress, expires, userAddress }) {
        const { ethereum } = await SolidoSingleton.getProps();
        const template = new ethers.Contract(templateAddress, WTemplateABI.abi, ethereum.provider.getSigner());

        let passphrase = `randompass-${ethers.utils.sha256(ethers.utils.randomBytes(32)).replace('0x','').substring(0,8)}`;
        console.log(passphrase);
        // create license
        const expiresIn = expires.getTime() / 1000;
        const lic = await template.createUserAccess(
            passphrase,
            expiresIn,
            'key', {
            gasLimit: 200_000,
            gasPrice: 10000000000 // 10 Gwei
        }
        );

        await lic.wait(1);


        let id = await template.addIdentity(
            userAddress,
            `did:ethr:${userAddress}`,
            passphrase,
            {
                gasLimit: 200_000,
                gasPrice: 10000000000 // 10 Gwei
            }
        );

        await id.wait(1);

    }

    public static async setTemplateOwner(templateAddress) {
        const { ethereum } = await SolidoSingleton.getProps();
        const template = new ethers.Contract(templateAddress, WTemplateABI.abi, ethereum.provider.getSigner());

        //  await contract.addACL(owner, 0); // add owner as admin
        const tx = await template.addACL(ethereum.account, {
            gasLimit: 100_000,
            gasPrice: 10000000000 // 10 Gwei
        });

        await  tx.wait(1);
    }

    public static getModelTemplate() {
        const abi = JSON.parse(EditorStorage.abi);
        const model = abi[`ModelTemplate.sol`];
        const name = Object.keys(model)[0];
        return { name, contract: model };
    }

    /**
     * 
     * @param address 
     * @param existingAbi 
     * @param args 
     */
    public static async publishModelTemplate({ name, address, existingAbi }) {
        const { ethereum } = await SolidoSingleton.getProps();
        const abi = JSON.parse(EditorStorage.abi);
        const model = abi[`${this.name}.sol`];
        // const name = Object.keys(model)[0];
        const modelAbi = model.abi;
        const bytecode = `0x${model.evm.bytecode.object}`;
        if (address && ethers.utils.isHexString(address)) {
            return new ethers.Contract(address, existingAbi, ethereum.provider);
        };

        let factory = new ethers.ContractFactory(modelAbi, bytecode, ethereum.provider.getSigner());
        let contract = await factory.deploy(ethereum.contracts.ExtensionEventRegistry.address);
        // The contract is NOT deployed yet; we must wait until it is mined
        await contract.deployed();
        EditorStorage.deployedModelTemplateAddress = contract.address;
        return { ...contract };
    }

    public static async  publishWorkflow() {
        const { ethereum } = await SolidoSingleton.getProps();
        const modelTemplateAddr = EditorStorage.deployedModelTemplateAddress;
        const tx = await ethereum.contracts.WFactory.instance.functions.payWorkflowTemplate(modelTemplateAddr, {
            value: 0.002 * 1e18
        });
        await tx.wait(2);
        const filter = await ethereum.contracts.WFactory.instance.filters.LogWorkflowCreated();

        filter.fromBlock = 0;
        filter.toBlock = "latest";

        const logs = await ethereum.contracts.WFactory.instance.provider.getLogs(filter);
        const interfaceUtils = new ethers.utils.Interface(ethereum.contracts.WFactory.abi);
        const parsed = logs.map(l => {
            const { values } = interfaceUtils.parseLog(l);
            return { ...values };
        }).reverse();
        const templAddress = parsed[0].wf;
        const template = new ethers.Contract(templAddress, WTemplateABI.abi, ethereum.provider.getSigner());
        const builder = new WorkflowBuilder();
        const inputs = JSON.parse(EditorStorage.wfTemplate);
        builder.createActors(inputs.actors);
        builder.createStates(inputs.states);
        inputs.steps.map(s => {
            builder.createStep(s);
        });
        const steps = builder.getSteps();
        const transitions = steps.map((s: WStep) => {
            return [
                s.currentActor,
                s.current,
                s.next,
            ] as Transition;
        });
        const payload = await builder.toTemplate({
            steps,
            transitions,
        });



        // const estimate = await template.estimate.createWF(
        //     payload
        // );

        //  const gas = estimate.toNumber();
        const created = await template.createWF(
            payload,
            {
                gasLimit: 4 * 500_000,
                gasPrice: 10000000000 // 10 Gwei
            }
        );

        await created.wait(1);

        return templAddress;
    }
}