import {
    IsDefined,
    IsOptional,
    IsString,
    validateOrReject
    } from 'class-validator';

const edge = require('electron-edge-js')
const getSlots  = edge.func({
    assemblyFile: '../../../../dotnet_bindings/pkcs11/bin/Debug/netstandard2.0/pkcs11.dll',
    methodName: 'GetSlots' // This must be Func<object,Task<object>>
});

const crypto = require('crypto');
const execa = require('execa');

export class PKCS11ToolBindingsConfig {
    public constructor() { }
    @IsDefined()
    algo: 'sha256' | 'sha512';

    @IsDefined()
    key: string;

    @IsOptional()
    verifyKey: string;

    @IsDefined()
    @IsString()
    module: string;

    @IsOptional()
    isSimulator: boolean;
}

export class PKCS11ToolBindings {
    constructor(public config: PKCS11ToolBindingsConfig) {
        this.config.algo = config.algo ?? 'sha256';
        this.config.module = config.isSimulator ? '/usr/local/lib/softhsm/libsofthsm2.so' : config.module;
    }

    async verify() {
        validateOrReject(this.config);

    }

    async login(pin: string) {
        const instance = await execa('/usr/bin/pkcs11-tool', [
            '--login',
            '--test',
            this.config.module ? '--module' : '', this.config.module || ''
        ], {
            reject: false
        });
        const { stdout, stderr } = await instance;
        if (stdout.length) {
            const value = Buffer.concat(stdout);
            if (value.indexOf('CKR_PIN_INCORRECT') >= -1) {
                return false;
            }
            return true;
        }
    }

    async list() {
        // @ts-ignore
        const response=await getSlots()
        console.log(response);
        return response;
    }

    async sign(payload: Buffer, pin: string) {
        validateOrReject(this.config);

        const algo = this.config.algo || 'sha256';
        if (!algo.startsWith('sha')) {
            throw 'Bad algo: expected sha256 or sha512';
        }
        const instance = await execa('/usr/bin/pkcs11-tool', [
            '--sign',
            '--signature-format', 'openssl',
            '--mechanism', 'SHA' + algo.replace('sha', '') + '-RSA-PKCS',
            '--id', this.config.key || '02',
            pin ? '--pin' : '', pin || '',
            this.config.module ? '--module' : '', this.config.module || ''
        ]);
        const { stdout, stderr } = await instance;

        if (stderr) throw new Error(stderr);

        let signature;
        if (stdout.length) {
            signature = Buffer.concat(stdout);
        } else {
            throw new Error(Buffer.concat(stderr).toString() || 'pkcs11-crypt error');
        }

        if (!this.config.verifyKey) {
            return signature;
        }
        const verify = crypto.createVerify(algo);
        verify.write(payload);
        verify.end();
        if (verify.verify(this.config.verifyKey, signature)) {
            return signature
        } else {
            throw new Error('Validation error');
        }
    }
};