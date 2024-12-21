import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client'
import {Chat} from "../model/Chat";
import {SocketSessionInfo} from "../model/SocketSessionInfo";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: Socket

  constructor() {
    this.socket = io('http://localhost:3000')
  }

  joinRoom(info: SocketSessionInfo) {
    this.socket.emit('joinRoom', info)
  }

  sendMessage(messageComponent: Chat) {
    this.socket.emit('message', {message: messageComponent.message, room: messageComponent.room, user: messageComponent.user})
  }

  exit(info : SocketSessionInfo)
  {
    this.socket.emit('leaveRoom', info);
  }

  async check(room: string) {
    try {
      const response = await fetch(
        "http://localhost:3000/check",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({room}),
          mode: "cors"
        }
      );

      if (!response.ok) {
        throw new Error('bad response from server');
      }

      const result = await response.json();
      console.log('Response from server:', result);
      return result;
    } catch (error) {
      console.log('error', error);
    }
  }

  async createRoom(room: string) {
    return await fetch(
      "http://localhost:3000/create",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({room}),
        mode: "cors"

      }
    ).then(response => {
        if (!response.ok) {
          return JSON.stringify(response.statusText)
        }

        if (response.status === 403) {
          return JSON.stringify(response.statusText)
        }
        return response.json()
      }
    ).then(data => {
      return data.message
    })
      .catch(error => console.log(error))
  }

}
