import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService,MessageService ]
})
export class AppComponent {
  msgs: Message[] = [];
  title = 'testangular6';
  myValues: string[] = ['valeur1','valeur2'];
  conn: WebSocket;
  constructor(private chatService: ChatService,private messageService: MessageService) {
    chatService.messages.subscribe(msg => {			
      console.log("Response from websocket: " + msg.message);
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
      console.log(msg.data);
		});
    /*
    this.conn = new WebSocket('ws://localhost:8080');

    this.conn.onopen = function(e) {
    console.log("Connection established!");
};

this.conn.onmessage = function(e) {
    console.log(e.data);
};
*/
}

private message = {
  author: 'tutorialedge',
  message: 'this is a test message',
  data: {"data":[{"id_favoris":"1","username":"lelongj","libelle":"Graphiques 31.2.85   et salles perso","routerlink":"\/viewgraphics","params":"{\u0022salles\u0022:[\u002231.2.85\u0022,\u0022\u0022,\u0022\u0022,\u0022\u0022]}"},{"id_favoris":"2","username":"lelongj","libelle":"Mes salles test","routerlink":"\/viewgraphics","params":"{\u0022salles\u0022:[\u002231.2.85\u0022,\u002231.2.89\u0022,\u002231.3.10\u0022,\u002235.1.53\u0022]}"}]}
}

sendMsg() {
  console.log('new message from client to websocket: ', this.message);
  this.chatService.messages.next(this.message);
  this.message.message = '';
}

public sendHelloWorld()
{
  this.conn.send('Hello World!');
}

  
  public helloWorld() {
    return 'Hello world!';
  }
}
