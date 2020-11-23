import Web3 from 'web3';
import { ContractProviderMapping, SolidoModule } from '@decent-bet/solido';
import { createTokenContractImport } from './TokenImportUtils';
import { Session } from '../../shared/Session';
import { EthersPlugin } from 'solido-provider-ethers';
import { TokenContract } from './TokenContract';
import { Wallet } from 'xdvplatform-wallet';
import { Token } from '../../shared/Token';

const { thorify } = require('thorify');

export class ContractFactory {
    static async loadContracts(wallet, chainTag) {

        const i = await Session.getSessionInfo();
        const has = i.currentKeystore;
        if (has === null || has === undefined) return;
        const host = 'https://testnet.veblocks.net';
        const thor: Web3 = thorify(new Web3(), host);
        const { currentKeystore } = await Session.getSessionInfo();
        const defaultAccount = currentKeystore.address;
        const config = {
            // read only, set a null private key
            privateKey: '',
            chainTag,
            defaultAccount,
            thor,
            wallet,
        };
        try {
            let tokens: Token[] = await Session.getTokens({
                chain: 'vechain'
            });

            // Merge with public tokens
            tokens = await ContractFactory.mergePublicTokenList(tokens);

            if (tokens) {
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
                const module = new SolidoModule(mappings);
                const c = module.bindContracts({
                    thorify: {
                        provider: thor,
                        options: config,
                    },
                }).connect();
                return Object.values(c).map(i => {
                    let tokenContract = new TokenContract(wallet, i, defaultAccount);
                    tokenContract.icon = tokens.filter(j => j.address === i.address)[0].icon;
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

        const testnetRegistry = [
            {
                "name": "VeThor",
                "symbol": "VTHO",
                "decimals": 18,
                "address": "0x0000000000000000000000000000456e65726779",
                "desc": "Represents the underlying cost of using VeChainThor",
                "icon": "3ac553ea77911248ab4519bca020e0aa2891a6c6.png",
                "totalSupply": "Infinite",
                "website": "https://www.vechain.org/",
                "whitePaper": "https://www.vechain.org/whitepaper/",
                "links": [
                    {
                        "twitter": "https://twitter.com/vechaindev"
                    },
                    {
                        "medium": "https://medium.com/@vechainofficial"
                    },
                    {
                        "github": "https://github.com/vechain"
                    }
                ]
            },
            {
                "name": "Plair",
                "symbol": "PLA",
                "decimals": 18,
                "address": "0x645d2019ed39e58db76af602317d177b53ba8b9d",
                "desc": "Plair is a decentralized gaming ecosystem disrupting the amateur gaming market",
                "icon": "dfe7a792d85cfd1483b03228fd1d51a383a3c7b5.png",
                "totalSupply": "100000000000000000000000000000"
            },
            {
                "name": "Safe Haven",
                "symbol": "SHA",
                "decimals": 18,
                "address": "0x9c6e62b3334294d70c8e410941f52d482557955b",
                "desc": "Asset Management & Inheritance Solutions",
                "icon": "d283b3d0888f9a33ce3db9e55640888db06b5dc4.png",
                "totalSupply": "662501001865650000000000000000"
            },
            {
                "name": "Eight Hours Token",
                "symbol": "EHrT",
                "decimals": 18,
                "address": "0xdeff1d52f3fbf551b3337b9a02f719cd21da956b",
                "desc": "Utility token for the 8Hours Platform",
                "icon": "aa05eb7852852116d54f3ad32d856353584710e2.png",
                "totalSupply": "9999968065899999999999995000"
            },
            {
                "name": "Decent.bet",
                "symbol": "DBET",
                "decimals": 18,
                "address": "0x510fcddc9424b1bbb328a574f45bfddb130e1f03",
                "desc": "DECENT.bet is an open-source p2p gaming platform built on the VeChain blockchain",
                "icon": "39cb9bcb279706b3ae09a8cc633bfca500cef5a3.png",
                "totalSupply": "205903294831970956466297922"
            },
            {
                "name": "OceanEx",
                "symbol": "OCE",
                "decimals": 18,
                "address": "0x9652aead889e8df7b5717ed984f147c132f85a69",
                "desc": "OceanEx Token (OCE) is OceanEx's platform token",
                "icon": "6fcdaf9e2663a21aecc7518f78ec6d1b2ebfd1ed.png",
                "totalSupply": "10000000000000000000000000000"
            },
            {
                "name": "Jur",
                "symbol": "JUR",
                "decimals": 18,
                "address": "0x602b7a4309b3412d269c6cdddad962c0b94494d8",
                "desc": "JUR Token is the token of justice. Access a decentralized legal ecosystem for professionals and enterprises.",
                "icon": "56e4bd509c299b4724f6dfc58237bd57ad7e1b58.png",
                "totalSupply": "1000000000000000001000000000"
            },
            {
                "name": "Yeet Coin",
                "symbol": "YEET",
                "decimals": 18,
                "address": "0x32456c328f647f5b35757d38fe634868d9fe3808",
                "desc": "Alpaca memes",
                "icon": "2e434b45fdbf3ea1d2676d3270ad8877221aefd1.png",
                "totalSupply": "69000000000000000000000000"
            },
            {
                "name": "SneakerCoin",
                "symbol": "SNK",
                "decimals": 18,
                "address": "0xe0d0402a948ab02af08938dad2a79669bdbe1c31",
                "desc": "A crypto asset that belongs to all young people around the world.",
                "icon": "e352c4d1e1343614b49d7f711075c7c8aec53b08.png",
                "totalSupply": "2000000000000000000000000000"
            }
        ];

        const tokens = testnetRegistry.map(i => {
            return Object.assign(new Token(), {
                name: i.name,
                symbol: i.symbol,
                decimals: i.decimals,
                address: i.address,
                totalSupply: i.totalSupply,
                chain: 'vechain',
                network: '0x27',
                icon: `https://vechain.github.io/token-registry/assets/${i.icon}`
            });
        });
        return [...tokens, ...userCustomTokens];
    }
}
