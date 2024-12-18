import {Component, OnInit} from '@angular/core';
import {io, Socket} from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  socket: Socket | undefined;
  messages: string[] = [];
  message : String =''
  constructor() {

  }
  ngOnInit()
  {
    this.socket = io('localhost:3000')
    this.socket.on('message', (msg) => {
        this.messages.push(msg);
      }
    )
  }

  joinRoom(): void {
      // @ts-ignore
    this.socket.emit('joinRoom', 'room1');
      alert(`You joined room: room1`);
  }

  sendMessage(): void {
    if (this.message) {
      // @ts-ignore
      this.socket.emit('message', { message: this.message, room: 'room1' });
      this.message = '';  // Clear the input after sending
    }
  }
}
