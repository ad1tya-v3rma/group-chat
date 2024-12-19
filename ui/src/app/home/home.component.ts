import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChatService} from "../service/chat.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  param: string='';
  active : string ='';
  result: string ='';

  @ViewChild('options')
  option! : ElementRef

  @ViewChildren('dialog')
  dialog! : QueryList<ElementRef>
  isDisabled: boolean = false;

  constructor(private chatService : ChatService, private router : Router) {
  }
  joinRoom(): void {
    this.router.navigate(['chat', this.param])
    // @ts-ignore
  }

  toggle(modal: string) {
    this.active = modal;
    this.isDisabled = !this.isDisabled
  }

  async createRoom() {
    this.result = await this.chatService.createRoom(this.param)
  }

  async check() {
    this.result = await this.chatService.check(this.param).then(response => {return response.message})
  }

  close()
  {
    this.active = '';
    this.isDisabled = !this.isDisabled
    this.result = '';
  }

}
