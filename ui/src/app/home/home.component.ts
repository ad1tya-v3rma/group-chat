import {Component} from '@angular/core';
import {ChatService} from "../service/chat.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  param: String='';
  active : String ='';
  result: string ='';

  constructor(private chatService : ChatService, private router : Router) {
  }

  async ops(param: string) {
    if (param === 'check') {
      let result = await fetch('localhost:3000/check',
        {
          headers:
            {
              'cors': '*',

            },
          body: JSON.stringify('')
        }
      )
    }
  }

  joinRoom(): void {
    this.router.navigate(['room', this.param])
    // @ts-ignore
  }

  toggle(modal: String) {
    this.active = modal;
  }

  async createRoom() {
    this.result = await this.chatService.createRoom(this.param)
  }

  async check() {
    this.result = await this.chatService.check(this.param).then(response => {return response.message})

  }
}
