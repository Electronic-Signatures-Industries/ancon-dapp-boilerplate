import * as SockJS from 'sockjs-client';
import { Client, Message, Stomp } from '@stomp/stompjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
const os = require('os');
const axios = require('axios');

export interface SmartCardConnectorEvent {
    eventName: string;
    payload: any;
}
const CLIENT_API = 'ws://localhost:8089';
export class SmartCardConnectorPKCS11 {
    module: string;
    subscribe: Subject<any> = new Subject();
    socket: any;
    stompClient: any;
    constructor(private keyId?: string) {
        this.keyId = keyId;
    }
    async initialize() {
        this.connect();
    }
    async getSlots() {
        // const slots = await axios(`${CLIENT_API}/sc/get_slots`);
        this.stompClient.publish({ destination: "/app/get_slots", skipContentLengthHeader: true });
    }

    async sign(index: string, pin: string, data: Buffer) {
        this.stompClient.publish({
            destination: "/app/sign", body:
                JSON.stringify({ tokenIndex: index, pin: pin, data: data.toString('base64') }),
        });
    }

    connect() {
        try {
            this.stompClient = Stomp.client((CLIENT_API + '/ws'));

            this.stompClient.onConnect = (frame) => {
                this.stompClient.subscribe('/xdv/messages', (data) => {
                    console.log(data)
                    this.subscribe.next(JSON.parse(data.body));
                });

            };
            if (this.stompClient.connected === false) {
                this.stompClient.activate();
            }
        } catch (e) {
            console.log('no client found')
        }
    }
}