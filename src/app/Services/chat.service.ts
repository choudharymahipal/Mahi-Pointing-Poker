import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Socket, io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import {
  IEstimation,
  ISession,
  IShowHide,
  IStoryDescription,
} from "../Shared/Models/iSession";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject("");
  public room$: BehaviorSubject<string> = new BehaviorSubject("");

  //socket = io("http://localhost:3000");
 socket = io("https://mahi-pointing-poker-api.onrender.com/");
  constructor(private http: HttpClient, private authService: AuthService) {}

  //#region Rooms Activity
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

  //Get all rooms list
  getAllRooms(): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.socket.on("allRooms", (rooms) => {
        observer.next(rooms);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  //#endregion

  //#region Users Activity
  //Get all user list
  getAllUsers(): Observable<ISession[]> {
    return new Observable<ISession[]>((observer) => {
      this.socket.on("allUsers", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  //#endregion

  //#region Story Description Activity
  //when observer update story desscription
  setStoryDescription(data: any): void {
    this.socket.emit("storyDescription", data);
  }

  //Get story description for other user (not observer)
  getStoryDescription(): Observable<IStoryDescription[]> {
    return new Observable<IStoryDescription[]>((observer) => {
      this.socket.on("allStories", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  //#endregion

  //#region Show Hide button Activity
  setShowHide(data: IShowHide): void {
    this.socket.emit("setShowHide", data);
  }

  getShowHide(): Observable<IShowHide[]> {
    return new Observable<IShowHide[]>((observer) => {
      this.socket.on("getAllShowHide", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  //#endregion

  //#region Story point Activity
  setStoryPoint(data: IEstimation): void {
    this.socket.emit("setStoryPoint", data);
  }

  getStoryPoint(): Observable<IEstimation[]> {
    return new Observable<IEstimation[]>((observer) => {
      this.socket.on("getStoryPoint", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
  //#endregion
}
