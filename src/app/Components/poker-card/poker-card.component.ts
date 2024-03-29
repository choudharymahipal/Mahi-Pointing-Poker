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
  userRole!:string;

  constructor(private authService: AuthService, private fb: FormBuilder,private route: Router) {
    this.currentSession = this.authService.getCurrentSession();
    if (this.currentSession.IsObserver) {
      this.roomStatus = "Your room is live now!";
      this.userRole = "Observer";
    } else {
      this.roomStatus = "Your room is still active!";
      this.userRole = "Developer";
    }
    this.cardForm = this.fb.group({
      username: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log("Card loaded!");
  }

  setUsername(): void {
    let _username = this.cardForm.get("username")?.value;
    if (_username) {
      this.authService.setUsernameInSession(_username, this.currentSession);
      this.route.navigateByUrl("/room");
    } else {
      //show error for username should not be null
      alert("Please enter your name.");
    }
  }
}
