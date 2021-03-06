import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
let CHAT_URL;
if(window.location.protocol == 'http:')
	CHAT_URL = 'ws://'+window.location.host+'/ws2/';
else
	CHAT_URL = 'wss://'+window.location.host+'/ws2/';
export interface Message {
	author: string,
	message: string,
	data: any,
}

@Injectable()
export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author: data.author,
					message: data.message,
					data: data.data
				}
			});
	}
}