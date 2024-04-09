import { Component, OnInit } from "@angular/core";
import io from "socket.io-client";
import { PokerCardComponent } from "../poker-card/poker-card.component";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
import { ChatService } from "../../Services/chat.service";
import { ISession, IShowHide, IStoryDescription } from "../../Shared/Models/iSession";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: "app-poker-room",
  standalone: true,
  imports: [ReactiveFormsModule, PokerCardComponent, CommonModule,ChatComponent],
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

  constructor(
    private readonly authService: AuthService,
    private route: Router,
    private chatService: ChatService,
    private fb: FormBuilder
  ) {
    this.currentSession = this.authService.getCurrentSession();
    this.socket = io("http://localhost:3000");
    this.cardForm = this.fb.group({
      sdescription: [null],
    });
  }

  ngOnInit(): void {
    this.getAllRooms();
    this.getAllUsers();
    this.getStoryDescription();
    this.getShowHideButton();
  }

  ngDoCheck(): void {
    this.isLoggedIn();
  }

  getAllRooms(): void {
    this.chatService.getAllRooms().subscribe((data: string[]) => {
      this.allRooms = [];
      this.allRooms = data;
    });
  }

  //Get All users details
  getAllUsers(): void {
    this.chatService.getAllUsers().subscribe((data: ISession[]) => {
      this.allUsers = [];
      this.allUsers = data;
      let playersData = this.allUsers.find((m) =>m.isObserver === false && m.roomId === this.currentSession.roomId);
      if (playersData) {
        this.showPlayerTable = true;
      } else {
        this.showPlayerTable = false;
      }
      console.log(this.showPlayerTable);
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
          for (let index = 0; index < data.length; index++) {
            if (data[index].roomId === this.currentSession.roomId) {
              //Set for observer
              this.cardForm
                .get("sdescription")
                ?.setValue(data[index].storyDescription);
                //set for players
                this.storyTitle=data[index].storyDescription;
              break;
            }
          }
        }
      });
  }

  //#region Show hide Button Activity
  changeShowHideVotes() {
    this.isShowVotes = !this.isShowVotes;
    let obj: IShowHide = {
      roomId: this.currentSession.roomId,
      isShow: this.isShowVotes,
    };
    //set show hide on the server
    this.chatService.setShowHide(obj);
  }

  getShowHideButton(): void {
    this.chatService
      .getShowHide()
      .subscribe((data: IShowHide[]) => {
        if (data.length) {
          for (let index = 0; index < data.length; index++) {
            if (data[index].roomId === this.currentSession.roomId) {
              this.isShowVotes=data[index].isShow;
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
    this.cardForm.get("sdescription")?.setValue(null);
  }

  isLoggedIn(): void {
    let AmILoggedIn = this.authService.isLoggedIn();
    if (!AmILoggedIn) {
      this.route.navigateByUrl("/");
    }
  }

  btn_storyPoint(id: any) {
    if(this.currentSession.isObserver){
      alert("You are an observer. You don't need to give story points.");
    }else{
      if (id === 0) {
        alert("0.5 clicked");
      } else if (id === 1) {
        alert("1 clicked");
      } else if (id === 2) {
        alert("2 clicked");
      } else if (id === 3) {
        alert("3 clicked");
      } else if (id === 5) {
        alert("5 clicked");
      }
    }
    
  }


}
