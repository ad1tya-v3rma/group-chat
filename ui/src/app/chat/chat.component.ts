import {Component, OnInit} from '@angular/core';
import {ChatService} from "../service/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat} from "../model/Chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Chat[] = [];
  message: string = '';
  room: string | null = ''

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router : Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>
      this.room = params.get('room'))
    if (this.room !== null) {
      this.chatService.joinRoom(this.room)
    }
    this.chatService.socket.on('message', (message) => {
      console.log(message)
      //@ts-ignore
      this.messages.push(new Chat(message, this.room, 'r'));
    })
  }

  sendMessage(): void {

    if (this.message) {
      // @ts-ignore
      let chat = new Chat(this.message, this.room, "s");
      this.messages.push(chat)
      // @ts-ignore
      this.chatService.sendMessage(chat)
      this.message = '';
    }
  }

  exitChat() {
    this.chatService.exit(this.room);
    this.router.navigateByUrl('home')
  }
}
