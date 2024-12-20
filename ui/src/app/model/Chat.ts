export class Chat {
  message: String;
  room: String;
  status: String

  constructor(message: String, room: String, status: String) {
    this.message = message;
    this.room = room;
    this.status = status;
  }

  setStatus(status: String) {
    this.status = status;
  }
}
