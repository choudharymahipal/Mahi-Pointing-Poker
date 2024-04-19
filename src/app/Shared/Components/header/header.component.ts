import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../../Services/chat.service";
import { AuthService } from "../../../Services/auth.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ISession } from "../../Models/iSession";
import { AppComponent } from "../../../app.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  username!: string;
  isLoggedInWithUsername: boolean = false;
  isOnline: boolean = false;
  allRooms: any[] = [];
  currentSession!: ISession;
  userJoinedRoom: boolean = false;
  inRoomPage: boolean = false;
  constructor(
    private router: Router,
    private readonly _chatService: ChatService,
    private readonly _authService: AuthService,
    private appCom: AppComponent
  ) {
    this.currentSession = this._authService.getCurrentSession();
    this.userJoinedRoom = this.appCom.userJoinedRoom;
    this.inRoomPage = this.appCom.inRoomPage;
  }
  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this._chatService.getAllRooms().subscribe((data: string[]) => {
      this.allRooms = [];
      this.allRooms = data;
      if (this.allRooms.find((m) => m === this.currentSession.roomId)) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    });
  }

  ngDoCheck(): void {
    this.getUsername();
  }

  getUsername(): void {
    this.isLoggedInWithUsername = this._authService.isLoggedInWithUsername();
    if (this.isLoggedInWithUsername) {
      let data = this._authService.getCurrentSession();
      this.username = data.username;
    }
  }

  reloadPage(): void {
    //remove this before deployment
    this.router.navigateByUrl("/card");
  }

  logout(): void {
    this._authService.removeAllSession();
  }
}
