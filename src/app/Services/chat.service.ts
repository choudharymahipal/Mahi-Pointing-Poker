import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    public message$: BehaviorSubject<string> = new BehaviorSubject('');
  
    socket = io('http://localhost:3000');
  
    public sendMessage(message:any) {
      this.socket.emit('message', message);
    }
  
    public getNewMessage = () => {
      this.socket.on('message', (message) =>{
        this.message$.next(message);
      });
      
      return this.message$.asObservable();
    };

    public createRoom(roomName:string){
        this.socket.emit('create', roomName);
    }

    public setUsername(name:string){
        this.socket.emit('setUsername',name);
    }
}
