import {Component, OnInit} from '@angular/core';
import {ChatService} from "../service/chat.service";
import {ActivatedRoute} from "@angular/router";
import {Chat} from "../model/Chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: string[] = [];
  message: string = '';
  room: string | null = ''

  constructor(private chatService: ChatService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>
      this.room = params.get('room'))
    if (this.room !== null) {
      this.chatService.joinRoom(this.room)
    }
    this.chatService.socket.on('message', (message) => this.messages.push(message))
  }

  joinRoom(): void {
    // @ts-ignore
    this.socket.emit('joinRoom', 'room1');
    alert(`You joined room: room1`);
  }

  sendMessage(): void {

    if (this.message) {
      // @ts-ignore
      this.chatService.sendMessage(new Chat(this.message, this.room))
      this.message = '';  // Clear the input after sending
    }
  }
}
