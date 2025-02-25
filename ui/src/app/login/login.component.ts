import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName!: string;

  constructor(private readonly router : Router)
  {

  }

  login() {
    sessionStorage.setItem("username",this.userName);
    this.router.navigateByUrl('home')
  }
}
