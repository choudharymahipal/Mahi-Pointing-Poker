import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Socket, io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { ISession } from "../Shared/Models/iSession";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject("");
  public room$: BehaviorSubject<string> = new BehaviorSubject("");

  socket = io("http://localhost:3000");

  constructor(private http: HttpClient,private authService:AuthService) {}

  //Generate unique room id
  generateUniqueId(): string {
    const id: string = uuid();
    return id;
  }

  //When user click on Join Now
  createRoom(): void {
    let data = this.authService.getCurrentSession();
    this.socket.emit("joinRoom", data);
  }

  //Get all user list
  getAllUsers(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on("allUsers", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  //when observer update story desscription 
  setStoryDescription(data: any): void {
    this.socket.emit("storyDescription", data);
  }

  //Get story description for other user (not observer)
  getStoryDescription(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on("newStoryDescription", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
