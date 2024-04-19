import { Injectable } from "@angular/core";
import { ISession } from "../Shared/Models/iSession";
import { Router } from "@angular/router";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private route: Router,private commonService:CommonService) {}

  createRoomSession(roomId: string): void {
    let obj: ISession = {
      userId: this.commonService.generateUniqueUserId(),
      roomId: roomId,
      socketId:"",
      isObserver: true,
      isOnline:false,
      username: "",
    };
    sessionStorage.setItem("userDetails", JSON.stringify(obj));
  }

  updateSessionJustBeforeCreateRoom(data: ISession): void {
    sessionStorage.setItem("userDetails", JSON.stringify(data));
  }

  joinRoomSession(roomId: string): void {
    let obj: ISession = {
      userId: this.commonService.generateUniqueUserId(),
      roomId: roomId,
      socketId:"",
      isObserver: false,
      isOnline:false,
      username: "",
    };
    sessionStorage.setItem("userDetails", JSON.stringify(obj));
  }

  getCurrentSession(): ISession {
    let completeObj: ISession;
    try {
      let currentSession = sessionStorage.getItem("userDetails");
      if (currentSession) {
        completeObj = JSON.parse(currentSession);
      } else {
        completeObj = {} as any as ISession;
      }
    } catch (error) {
      console.log("getCurrentSession() error: ", error);
      completeObj = {} as any as ISession;
    }
    return completeObj;
  }

  setUsernameInSession(username: string, currentSession: ISession): void {
    //Here, userId will be blank. waiting for live room. once live then update it later.
    currentSession.username = username;
    sessionStorage.setItem("userDetails", JSON.stringify(currentSession));
  }

  //User logged in with username or not
  isLoggedInWithUsername(): boolean {
    let data = this.getCurrentSession();
    if (data.hasOwnProperty("username")) {
      if (data.username) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //User logged in or not
  isLoggedIn(): boolean {
    let data = this.getCurrentSession();
    if (data.hasOwnProperty("roomId")) {
      return true;
    } else {
      return false;
    }
  }

  removeAllSession(): void {
    sessionStorage.clear();
    this.route.navigateByUrl("/");
  }
}
