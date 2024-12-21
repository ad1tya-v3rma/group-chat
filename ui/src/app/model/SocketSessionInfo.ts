export class SocketSessionInfo
{
  private _room:string;
  private _username:string;


  constructor(room: string, username: string) {
    this._room = room;
    this._username = username;
  }


  get room(): string {
    return this._room;
  }

  get username(): string {
    return this._username;
  }


  set room(value: string) {
    this._room = value;
  }

  set username(value: string) {
    this._username = value;
  }
}
