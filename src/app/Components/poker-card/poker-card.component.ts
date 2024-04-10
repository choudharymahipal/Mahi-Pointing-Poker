import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Services/auth.service";
import { ISession } from "../../Shared/Models/iSession";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NotificationComponent } from "../../Shared/Components/notification/notification.component";
import { Router } from "@angular/router";
import { ChatService } from "../../Services/chat.service";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-poker-card",
  standalone: true,
  imports: [ReactiveFormsModule, NotificationComponent],
  templateUrl: "./poker-card.component.html",
  styleUrl: "./poker-card.component.scss",
})
export class PokerCardComponent implements OnInit {
  currentSession!: ISession;
  cardForm!: FormGroup;
  username = new FormControl();
  roomStatus!: string;
  userRole!: string;
  allUsers: ISession[] = [];

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private fb: FormBuilder,
    private route: Router,
    private appCom:AppComponent
  ) {
    this.appCom.userJoinedRoom=false;
    this.currentSession = this.authService.getCurrentSession();
    if (this.currentSession.isObserver) {
      this.roomStatus = "Your room is ready to live!";
      this.userRole = "Observer";
    } else {
      this.roomStatus = "Your room is still active!";
      this.userRole = "Developer";
    }
    if (this.currentSession.username != "") {
      this.route.navigateByUrl("/room");
    }
    this.cardForm = this.fb.group({
      username: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.isLoggedIn();
    this.getAllUsers();
  }

  setUsername(): void {
    let _username = this.cardForm.get("username")?.value;
    if (_username) {
      //if (this.currentSession.isObserver) {
      //No need to check duplicate username if user is observer.
      this.authService.setUsernameInSession(_username, this.currentSession);
      //Now user ready for live
      this.chatService.createRoom();
      //user entered in the room
      this.route.navigateByUrl("/room");
      //} else {
      //check duplicate username for players
      //this.authService.setUsernameInSession(_username, this.currentSession);
      //Now user ready for live
      //this.chatService.createRoom();
      //user entered in the room
      //this.route.navigateByUrl("/room");
      //}
    } else {
      //show error for username should not be null
      alert("Please enter your name.");
    }
  }

  isLoggedIn(): void {
    let AmILoggedIn = this.authService.isLoggedIn();
    if (!AmILoggedIn) {
      this.route.navigateByUrl("/");
    }
  }

  //Get All users details
  getAllUsers(): void {
    this.chatService.getAllUsers().subscribe((data: ISession[]) => {
      console.log("All Users:", data);
      this.allUsers = [];
      this.allUsers = data;
    });
  }
}
