import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
const os = require('os');
const axios = require('axios');

export interface SmartCardConnectorEvent {
    eventName: string;
    payload: any;
}
const CLIENT_API = 'http://localhost:8089';
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
        // const res = await axios.post(`${CLIENT_API}/sc/sign/${index}`, {
        //     pin,
        //     data: data.toString('base64')
        // });
        // return res.data;
        this.stompClient.publish({ destination: "/app/sign", body: { pin, data: data.toString('base64') } , skipContentLengthHeader: true });

        return this.subscribe.pipe(
            filter(i => i && i.type === 'signing')
        );
    }

    connect() {
        this.socket = new SockJS(CLIENT_API + '/ws');
        this.stompClient = new Client({
            webSocketFactory: () => this.socket,
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });


        this.stompClient.onConnect = (frame) => {
            this.stompClient.subscribe('/xdv/messages', (data) => {
                console.log(data)
                this.subscribe.next(JSON.parse(data.body));
            });
        };
        this.stompClient.activate();
    }
}