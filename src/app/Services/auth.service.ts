import { Injectable } from "@angular/core";
import { ISession } from "../Shared/Models/iSession";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  createRoomSession(clientId: string): void {
    let obj: ISession = {
      roomId: clientId,
      IsObserver: true,
      username: "",
    };
    sessionStorage.setItem("userDetails", JSON.stringify(obj));
  }

  joinRoomSession(clientId: string): void {
    let obj: ISession = {
      roomId: clientId,
      IsObserver: false,
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

  setUsernameInSession(username: string,currentSession:ISession): void {
    if (currentSession.IsObserver) {
      //Update session and socket api for admin
      //No need to check duplicate username for admin because observer can not be multiple in a single room.
      currentSession.username = username;
      sessionStorage.setItem("userDetails", JSON.stringify(currentSession));
    } else {
      //Update session and socket api for other users.
      //check duplicate username because user can be multiple in a single room.
      
    }
    
  }

  removeAllSession(): void {
    sessionStorage.clear();
  }
}
