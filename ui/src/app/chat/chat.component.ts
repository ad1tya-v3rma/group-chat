import {Component, Input, OnInit} from '@angular/core';
import {io, Socket} from "socket.io-client";
import {ChatService} from "../service/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  socket: Socket | undefined;
  messages: string[] = [];
  message : String ='';
  @Input()//@ts-ignore
  room : String
  constructor(private chatService : ChatService) {

  }
  ngOnInit()
  {
    this.chatService.joinRoom(this.room)
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
