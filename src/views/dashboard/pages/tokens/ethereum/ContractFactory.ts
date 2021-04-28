import Web3 from 'web3';
import { ContractProviderMapping, SolidoModule } from '@decent-bet/solido';
import { createTokenContractImport } from './TokenImportUtils';
import { Session } from '../../shared/Session';
import { EthersPlugin } from 'solido-provider-ethers';
import { TokenContract } from './TokenContract';
import { Wallet } from 'xdvplatform-wallet';
import { Token } from '../../shared/Token';
import { ethers } from 'ethers';
const store = {
    state: {
        currentTransaction: {
            txhash: ""
        }
    },
    mutations: {
    },
    mapEvents: {
    },
    mapActions: {
    }
};
const INFURA = 'https://ropsten.infura.io/v3/92ed13edfad140409ac24457a9c4e22d';

/**
 * Token contract factory for Ethereum
 */
export class ContractFactory {

    /**
     * Load token contracts
     * @param wallet 
     * @param network 
     */
    static async loadContracts(wallet, network) {

        const i = await Session.getSessionInfo();
        const has = i.currentKeystore;
        if (has === null || has === undefined) return;
        const currentKeystore = has;
        const defaultAccount = currentKeystore.address;

        try {
            // Get previously loaded tokens
            let tokens: Token[] = await Session.getTokens({
                chain: 'ethereum'
            });
            // Merge with public tokens
            tokens = await ContractFactory.mergePublicTokenList(tokens);

            if (tokens) {
                // TODO: Refactor
                const mappings = tokens.filter(i => !!i.network).map(i => {
                    const abi = createTokenContractImport({
                        'ropsten': i.network === 'ropsten' ? i.address : '',
                        'rinkeby': i.network === 'rinkeby' ? i.address : '',
                        'mainnet': i.network === 'mainnet' ? i.address : '',
                    });
                    return {
                        name: i.name,
                        import: abi,
                        enableDynamicStubs: true,
                        provider: EthersPlugin,
                    };
                });
                const provider = new ethers.providers.JsonRpcProvider(INFURA);
                const module = new SolidoModule(mappings);
                const c = module.bindContracts({
                    ethers: {
                        provider,
                        options: {
                            walletProvider: wallet,
                            defaultAccount,
                            provider,
                            network,
                            store
                        }
                    }
                }).connect();
                return Object.values(c).map(contract => {
                    let tokenContract = new TokenContract(contract as any, defaultAccount);
                    // tokenContract.icon = tokens.filter(j => j.address === i.address)[0].icon;
                    return tokenContract;

                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    private static async mergePublicTokenList(userCustomTokens: Token[]): Promise<Token[]> {
        // Icon: https://vechain.github.io/token-registry/assets/{item.icon}.png
        // https://vechain.github.io/token-registry/test.json

        const ropstenRegistry = [
            // {
            //     "name": "Ethereum",
            //     "symbol": "ETH",
            //     "decimals": 18,
            //     "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            //     "desc": "Ethereum",
            //     "icon": "3ac553ea77911248ab4519bca020e0aa2891a6c6.png",
            // },
            {
                "name": "DAI",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0xaD6D458402F60fD3Bd25163575031ACDce07538D",
                "desc": "DAI stablecoin",
                "icon": "dfe7a792d85cfd1483b03228fd1d51a383a3c7b5.png",
            },
        ];

        const tokens = ropstenRegistry.map(i => {
            return Object.assign(new Token(), {
                name: i.name,
                symbol: i.symbol,
                decimals: i.decimals,
                address: i.address,
                chain: 'ethereum',
                network: 'ropsten',
            });
        });
        return [...tokens, ...userCustomTokens];
    }
}
