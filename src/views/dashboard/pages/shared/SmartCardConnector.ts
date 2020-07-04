import { sign } from '@erebos/secp256k1';
import { Subject } from 'rxjs';
const pcsc = require('pcsclite');
const graphene = require("graphene-pk11");
const Module = graphene.Module;

export interface SmartCardConnectorEvent {
    eventName: string;
    payload: any;
}

export class SmartCardConnector {
    pcsc: any;
    state: any;
    SCARD_STATE_EMPTY: number;
    reader: any;
    SCARD_STATE_PRESENT: number;
    SCARD_SHARE_SHARED: any;

    constructor(
        public events: Subject<SmartCardConnectorEvent> = new Subject<SmartCardConnectorEvent>()
    ) {
        this.pcsc = pcsc();
        this.pcsc.on('reader', this.onReader);
    }



    async onReader(reader) {
        this.reader = reader;
        console.log('New reader detected', reader.name);
        reader.on('error', err => this.events.next({
            eventName: 'error',
            payload: err
        }));
        reader.on('status', async status => await this.onStatus(status));
        reader.on('end', () => this.events.next({
            eventName: 'removed',
            payload: null,
        }));


        pcsc.on('error', function (err) {
            console.log('PCSC error', err.message);
        });
    }

    connect() {
        return new Promise(
            (resolve, reject) => {
                this.reader.connect({ share_mode: this.SCARD_SHARE_SHARED }, (err, protocol) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(protocol);
                    }
                });

            }
        );
    }

    disconnect() {
        return new Promise(
            (resolve, reject) => {
                this.reader.disconnect(this.reader.SCARD_LEAVE_CARD, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Disconnected');
                    }
                });
            }
        );
    }

    transmit(protocol: any) {
        return new Promise(
            (resolve, reject) => {
                this.reader.transmit(new Buffer([0x00, 0xB0, 0x00, 0x00, 0x20]), 40, protocol, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Data received', data);
                        this.reader.close();
                        this.pcsc.close();
                    }
                });
            }
        );
    }
    async onStatus(status: any) {
        /* check what has changed */
        const changes = this.state ^ status.state;
        if (changes) {
            if ((changes & this.SCARD_STATE_EMPTY) && (status.state & this.SCARD_STATE_EMPTY)) {
                await this.disconnect();
            } else if ((changes & this.SCARD_STATE_PRESENT) && (status.state & this.SCARD_STATE_PRESENT)) {
                console.log("card inserted");/* card inserted */
                try {
                    const protocol = await this.connect();
                    const response = await this.transmit(protocol);
                    this.events.next({ eventName: 'transmit', payload: response });
                } catch (err) {
                    this.events.next({ eventName: 'error', payload: err });
                }
            }
        }

    }
}


export class SmartCardConnectorPKCS11 {
    constructor(private mod?: any) {   
        this.mod = Module.load("/usr/local/lib/softhsm/libsofthsm2.so", "SoftHSM");
    }

    login(pin) {
        this.mod.initialize();
        const session = this.mod.getSlots(0).open();
        session.login(pin);
        this.mod.finalize();
    }

    logout() {
        this.mod.initialize();       
        const session = this.mod.getSlots(0).open();
        session.logout();
        this.mod.finalize();
    }
    async addSelfSignCert() {

        this.mod.initialize();

        try {
            const slot = this.mod.getSlots(0);
            const session = slot.open(2 | 4)
            session.login("password");

            const template = {
                class: graphene.ObjectClass.CERTIFICATE,
                certType: graphene.CertificateType.X_509,
                private: false,
                token: false,
                id: Buffer.from([1, 2, 3, 4, 5]), // Should be the same as Private/Public key has
                label: "My certificate",
                subject: Buffer.from("3034310B300906035504...", "hex"),
                value: Buffer.from("308203A830820290A003...", "hex"),
            };

            const objCert = session.create(template).toType();

            console.log("Certificate: created\n");
            console.log("Certificate info:\n===========================");
            console.log("Handle:", objCert.handle.toString("hex"));
            console.log("ID:", objCert.id.toString("hex"));
            console.log("Label:", objCert.label);
            console.log("category:", graphene.CertificateCategory[objCert.category]);
            console.log("Subject:", objCert.subject.toString("hex"));
            console.log("Value:", objCert.value.toString("hex"));
        } catch (err) {
            console.error(err);
        }

        this.mod.finalize();
    }
    async list() {
        this.mod.initialize();
        // get slots
        const slots = this.mod.getSlots(true);
        if (slots.length > 0) {
            for (const i = 0; i < slots.length; i++) {
                const slot = slots.items(i);
                console.log("Slot #" + slot.handle);
                console.log("\tDescription:", slot.slotDescription);
                console.log("\tSerial:", slot.getToken().serialNumber);
                console.log("\tPassword(min/max): %d/%d", slot.getToken().minPinLen, slot.getToken().maxPinLen);
                console.log("\tIs hardware:", !!(slot.flags & graphene.SlotFlag.HW_SLOT));
                console.log("\tIs removable:", !!(slot.flags & graphene.SlotFlag.REMOVABLE_DEVICE));
                console.log("\tIs initialized:", !!(slot.flags & graphene.SlotFlag.TOKEN_PRESENT));
                console.log("\n\nMechanisms:");
                console.log("Name                       h/s/v/e/d/w/u");
                console.log("========================================");
                function b(v) {
                    return v ? "+" : "-";
                }

                function s(v) {
                    v = v.toString();
                    for (const i_1 = v.length; i_1 < 27; i_1++) {
                        v += " ";
                    }
                    return v;
                }

                const mechs = slot.getMechanisms();
                for (const j = 0; j < mechs.length; j++) {
                    const mech = mechs.items(j);
                    console.log(s(mech.name) +
                        b(mech.flags & graphene.MechanismFlag.DIGEST) + "/" +
                        b(mech.flags & graphene.MechanismFlag.SIGN) + "/" +
                        b(mech.flags & graphene.MechanismFlag.VERIFY) + "/" +
                        b(mech.flags & graphene.MechanismFlag.ENCRYPT) + "/" +
                        b(mech.flags & graphene.MechanismFlag.DECRYPT) + "/" +
                        b(mech.flags & graphene.MechanismFlag.WRAP) + "/" +
                        b(mech.flags & graphene.MechanismFlag.UNWRAP));
                }
            }
        }
        this.mod.finalize();
        return slots;
    }
    async sign(slot, pin) {
        try {
            debugger

            this.mod.initialize();

            const slot = this.mod.getSlots(0);
            if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
                const session = slot.open();
                session.login("12345");

                // generate RSA key pair
                const keys = session.generateKeyPair(graphene.KeyGenMechanism.RSA, {
                    keyType: graphene.KeyType.RSA,
                    modulusBits: 1024,
                    publicExponent: Buffer.from([3]),
                    token: false,
                    verify: true,
                    encrypt: true,
                    wrap: true
                }, {
                    keyType: graphene.KeyType.RSA,
                    token: false,
                    sign: true,
                    decrypt: true,
                    unwrap: true
                });

                // sign content
                const sign = session.createSign("SHA1_RSA_PKCS", keys.privateKey);
                sign.update("simple text 1");
                sign.update("simple text 2");
                const signature = sign.final();
                console.log("Signature RSA-SHA1:", signature.toString("hex")); // Signature RSA-SHA1: 6102a66dc0d97fadb5...

                // verify content
                const verify = session.createVerify("SHA1_RSA_PKCS", keys.publicKey);
                verify.update("simple text 1");
                verify.update("simple text 2");
                const verify_result = verify.final(signature);
                console.log("Signature RSA-SHA1 verify:", verify_result);      // Signature RSA-SHA1 verify: true

                session.logout();
                session.close();
            }
            else {
                console.error("Slot is not initialized");
            }

            this.mod.finalize();
        }
        catch (e) {
            console.error(e);
        }
 
    }
}