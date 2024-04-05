import { Component, OnInit } from "@angular/core";
import io from "socket.io-client";
import { PokerCardComponent } from "../poker-card/poker-card.component";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
import { ChatService } from "../../Services/chat.service";
import { ISession, IStoryDescription } from "../../Shared/Models/iSession";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-poker-room",
  standalone: true,
  imports: [ReactiveFormsModule,PokerCardComponent,CommonModule],
  templateUrl: "./poker-room.component.html",
  styleUrl: "./poker-room.component.scss",
})
export class PokerRoomComponent implements OnInit {
  socket: any;
  isShowVotes: boolean = true;
  cardForm!: FormGroup;
  currentSession!: ISession;

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

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.isLoggedIn();
    this.getAllUsers();
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
    this.chatService.getStoryDescription().subscribe((data:any) => {
      console.log("Story Description:", data);
    });
  }

  //Get All players details
  getAllUsers(): void {
    this.chatService.getAllUsers().subscribe((data:any) => {
      console.log("All Users:", data);
    });
  }

  changeShowHideVotes() {
    this.isShowVotes = !this.isShowVotes;
  }

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
}
