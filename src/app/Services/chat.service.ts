import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Socket, io } from "socket.io-client";

import {
  IEstimation,
  ISession,
  IShowHide,
  IStoryDescription,
} from "../Shared/Models/iSession";
import { AuthService } from "./auth.service";
import { CommonService } from "./common.service";
import { Router } from "@angular/router";
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  socket = io(environment.SOCKET_ENDPOINT);
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected: ", reason);
    });
  }

  //#region Rooms Activity

  //When user click on Join Now
  createRoom(): void {
    let data = this.authService.getCurrentSession();
    if (this.socket.id) {
      data.socketId = this.socket.id;
    }
    this.authService.updateSessionJustBeforeCreateRoom(data);
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
    console.log("I'm in service");
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

  clearStoryPoint(data: IEstimation[]): void {
    this.socket.emit("clearStoryPoint", data);
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

  //#region disconnect activity
  disconnectUser(): void {
    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected: ", reason);
    });
  }
  //#endregion
}
