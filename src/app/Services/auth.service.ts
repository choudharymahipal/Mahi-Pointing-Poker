import { Injectable } from "@angular/core";
import { ISession } from "../Shared/Models/iSession";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private route: Router) {}

  createRoomSession(clientId: string): void {
    let obj: ISession = {
      roomId: clientId,
      isObserver: true,
      username: "",
    };
    sessionStorage.setItem("userDetails", JSON.stringify(obj));
  }

  joinRoomSession(clientId: string): void {
    let obj: ISession = {
      roomId: clientId,
      isObserver: false,
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
