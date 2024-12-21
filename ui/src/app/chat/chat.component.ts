import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../service/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chat} from "../model/Chat";
import {SocketSessionInfo} from "../model/SocketSessionInfo";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  messages: Chat[] = [];
  message: string = '';
  room: string = '';
  username : string='';

  @ViewChild("msgContainer")
  msgContainer !: ElementRef

  constructor(private readonly chatService: ChatService, private readonly route: ActivatedRoute, private readonly router: Router) {

  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username')+''
    this.route.paramMap.subscribe(params =>
      this.room = params.get('room') + '')
    if (this.room !== null) {
      this.chatService.joinRoom(new SocketSessionInfo(this.room, this.username))
      this.messages.push(new Chat(`you have joined ${this.room}`, this.room, 'u', this.username))
    }
    this.chatService.socket.on('message', (message) => {
      console.log(message.message)
      //@ts-ignore
      this.messages.push(new Chat( message.message , this.room, 'status' in message ? "u" : "r", message.user));
    })

  }

  ngAfterViewChecked() {
    this.autoScroll();
  }

  sendMessage(): void {

    if (this.message) {
      // @ts-ignore
      let chat = new Chat(this.message, this.room, "s", this.username);
      this.messages.push(chat)
      // @ts-ignore
      this.chatService.sendMessage(chat)
      this.message = '';
    }
  }

  exitChat() {
    this.chatService.exit(new SocketSessionInfo(this.room, this.username));
    this.router.navigateByUrl('home')
  }

  autoScroll() {
    this.msgContainer.nativeElement.scrollTop = this.msgContainer.nativeElement.scrollHeight
  }

}
