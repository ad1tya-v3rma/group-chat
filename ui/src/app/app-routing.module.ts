import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat/chat.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes =
  [

    {
      path : 'login', component : LoginComponent
    },
    {
      path : 'chat/:room' , component : ChatComponent
    },
    {
      path : 'home', component : HomeComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
