import { Component, OnInit } from "@angular/core";
import io from "socket.io-client";
import { PokerCardComponent } from "../poker-card/poker-card.component";
import { AuthService } from "../../Services/auth.service";
import { Router, RouterOutlet } from "@angular/router";
import { ChatService } from "../../Services/chat.service";
import {
  IAllUsersWithSP,
  IEstimation,
  ISession,
  IShowHide,
  IStoryDescription,
} from "../../Shared/Models/iSession";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "../chat/chat.component";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-poker-room",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PokerCardComponent,
    CommonModule,
    ChatComponent,
  ],
  providers: [AuthService, ChatService],
  templateUrl: "./poker-room.component.html",
  styleUrl: "./poker-room.component.scss",
})
export class PokerRoomComponent implements OnInit {
  socket: any;
  isShowVotes: boolean = true;
  cardForm!: FormGroup;
  currentSession!: ISession;
  allRooms: any[] = [];
  allUsers: ISession[] = [];
  storyTitle: string = "";
  showPlayerTable: boolean = false;
  allUsersWithSP: IAllUsersWithSP[] = [];
  avgStoryPoint: number = 0;
  isOnline: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private route: Router,
    private routerOutlet: RouterOutlet,
    private chatService: ChatService,
    private fb: FormBuilder,
    private appCom: AppComponent
  ) {
    this.appCom.userJoinedRoom = true;
    this.appCom.inRoomPage = true;

    this.currentSession = this.authService.getCurrentSession();
    this.socket = io("http://localhost:3000");
    //this.socket = io("https://mahi-pointing-poker-api.onrender.com");
    this.cardForm = this.fb.group({
      sdescription: [null],
    });
  }

  ngOnInit(): void {
    this.getAllRooms();
    this.getAllUsers();
    this.getStoryDescription();
    this.getShowHideButton();
    this.getAllStoryPoints();
  }

  ngDoCheck(): void {
    this.isLoggedIn();
  }

  ngOnChanges(): void {
    this.routerOutlet.activateEvents.subscribe((event) => {
      // Handle the event here.
      console.log("Outlet Event: ", event);
    });
  }

  getAllRooms(): void {
    this.chatService.getAllRooms().subscribe((data: string[]) => {
      this.allRooms = [];
      this.allRooms = data;
      if (this.allRooms.find((m) => m === this.currentSession.roomId)) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    });
  }

  //Get All users details
  getAllUsers(): void {
    this.chatService.getAllUsers().subscribe((data: ISession[]) => {
      this.allUsersWithSP = [];
      this.allUsers = [];
      this.allUsers = data;
      for (const element of this.allUsers) {
        this.allUsersWithSP.push({
          userId: element.userId,
          roomId: element.roomId,
          socketId: element.socketId,
          username: element.username,
          isObserver: element.isObserver,
          isOnline: element.isOnline,
          storyPoint: 0,
        });
      }
      let playersData = this.allUsers.find(
        (m) => m.isObserver === false && m.roomId === this.currentSession.roomId
      );
      if (playersData) {
        this.showPlayerTable = true;
      } else {
        this.showPlayerTable = false;
      }
    });
  }

  //set story description
  setStoryDescription(): void {
    let obj: IStoryDescription = {
      roomId: this.currentSession.roomId,
      storyDescription: this.cardForm.get("sdescription")?.value,
    };
    //set story description on the server
    this.chatService.setStoryDescription(obj);
  }

  //get story description
  getStoryDescription(): void {
    this.chatService
      .getStoryDescription()
      .subscribe((data: IStoryDescription[]) => {
        //console.log("Stories: ", data);
        if (data.length) {
          for (const element of data) {
            if (element.roomId === this.currentSession.roomId) {
              //Set for observer
              this.cardForm
                .get("sdescription")
                ?.setValue(element.storyDescription);
              //set for players
              this.storyTitle = element.storyDescription;
              break;
            }
          }
        }
      });
  }

  //#region Show hide Button Activity
  changeShowHideVotes() {
    this.isShowVotes = !this.isShowVotes;
    if (!this.isShowVotes) {
      this.calculateAvg();
    }
    let obj: IShowHide = {
      roomId: this.currentSession.roomId,
      isShow: this.isShowVotes,
      averagePoint: this.avgStoryPoint,
    };
    //set show hide on the server
    this.chatService.setShowHide(obj);
  }

  getShowHideButton(): void {
    this.chatService.getShowHide().subscribe((data: IShowHide[]) => {
      if (data.length) {
        for (const element of data) {
          if (element.roomId === this.currentSession.roomId) {
            this.isShowVotes = element.isShow;
            this.avgStoryPoint = element.averagePoint;
            break;
          }
        }
      }
    });
  }
  //#endregion

  clearVotes() {
    //clear votes
    this.isShowVotes = true;
    this.avgStoryPoint = 0;
    this.cardForm.get("sdescription")?.setValue(null);
    //clear story points for all users
    for (let index = 0; index < this.allUsersWithSP.length; index++) {
      let obj: IEstimation = {
        userId: this.allUsersWithSP[index].userId,
        socketId: this.allUsersWithSP[index].socketId,
        roomId: this.allUsersWithSP[index].roomId,
        username: this.allUsersWithSP[index].username,
        storyPoint: 0,
      };

      this.chatService.setStoryPoint(obj);
    }
  }

  isLoggedIn(): void {
    let AmILoggedIn = this.authService.isLoggedIn();
    if (!AmILoggedIn) {
      this.route.navigateByUrl("/");
    }
  }

  //#region Story Point Activity
  btn_storyPoint(id: any) {
    if (this.currentSession.isObserver) {
      alert("You are an observer. You don't need to give story points.");
    } else {
      let obj: IEstimation = {
        userId: this.currentSession.userId,
        roomId: this.currentSession.roomId,
        socketId: this.currentSession.socketId,
        username: this.currentSession.username,
        storyPoint: 0,
      };

      if (id === 0) {
        obj.storyPoint = 0.5;
      } else if (id === 1) {
        obj.storyPoint = 1;
      } else if (id === 2) {
        obj.storyPoint = 2;
      } else if (id === 3) {
        obj.storyPoint = 3;
      } else if (id === 5) {
        obj.storyPoint = 5;
      }
      this.chatService.setStoryPoint(obj);
    }
  }

  getAllStoryPoints(): void {
    this.chatService.getStoryPoint().subscribe((data: IEstimation[]) => {
      if (data.length) {
        for (const element of data) {
          if (element.roomId === this.currentSession.roomId) {
            let indexToUpdate = this.allUsersWithSP.findIndex(
              (a) =>
                a.userId === element.userId &&
                a.roomId === element.roomId &&
                a.username === element.username &&
                a.isObserver === false
            );
            this.allUsersWithSP[indexToUpdate].storyPoint = element.storyPoint;
          }
        }
      }
    });
  }
  //#endregion

  calculateAvg(): void {
    this.avgStoryPoint = 0;
    //get only participated value
    let totalCount = 0;
    let totalActiveUsers = 0;
    for (let index = 0; index < this.allUsersWithSP.length; index++) {
      if (
        this.allUsersWithSP[index].userId === this.currentSession.userId &&
        this.allUsersWithSP[index].roomId === this.currentSession.roomId &&
        this.allUsersWithSP[index].isObserver === false &&
        this.allUsersWithSP[index].storyPoint > 0
      ) {
        totalCount += this.allUsersWithSP[index].storyPoint;
        totalActiveUsers++;
      }
    }
    if (totalCount > 0) {
      this.avgStoryPoint = totalCount / totalActiveUsers;
    }
  }
}
