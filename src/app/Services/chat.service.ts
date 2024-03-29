import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Socket, io } from "socket.io-client";
import { v4 as uuid } from "uuid";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject("");
  public room$: BehaviorSubject<string> = new BehaviorSubject("");

  socket = io("http://localhost:3000");

  constructor(private http: HttpClient) {}

  generateUniqueId(): string {
    const id: string = uuid();
    return id;
  }

  createChannel(channelId: string): void {
    this.socket.emit("createChannel", channelId);
  }

  getAllChannel(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/active-channels`);
  }

  //Send complete object with ChannelId and username
  joinChannel(channelId: string): void {
    this.socket.emit("joinChannel", channelId);
  }

  sendMessageInRoom(messageData: any): void {
    this.socket.emit("sendMessage", messageData);
  }

  receiveMessage(channelId: any): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:3000/api/messages/${channelId}`
    );
  }
}
