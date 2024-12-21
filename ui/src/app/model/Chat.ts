export class Chat {
  message: string;
  room: string;
  status: string;
  user: string

  constructor(message: string, room: string, status: string, user: string) {
    this.message = message;
    this.room = room;
    this.status = status;
    this.user = user
  }



  setStatus(status: string) {
    this.status = status;
  }
}
