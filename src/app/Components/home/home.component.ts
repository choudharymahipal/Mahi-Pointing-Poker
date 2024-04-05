import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../../Services/chat.service";
import { AuthService } from "../../Services/auth.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
//import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  cardForm!: FormGroup;

  constructor(
    private route: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private fb: FormBuilder //private toastrService: ToastrService
  ) {
    this.cardForm = this.fb.group({
      roomId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    //Clear all sessions when home page loaded.
    this.authService.removeAllSession();
  }

  //Create only session when user click on create room
  createRoom(): void {
    let uniqueId = this.chatService.generateUniqueId();
    this.authService.createRoomSession(uniqueId);
    this.route.navigateByUrl("/card");
  }

  //for join user, i will update it later
  checkRoomIsExistOrNot(): void {
    let _roomId = this.cardForm.get("roomId")?.value;
    if (_roomId) {
      //this.chatService.joinChannel("",_roomId);
      //this.chatService.getAllRooms();
      //this.route.navigateByUrl("/card");
    } else {
      alert("Please provide room Id to join session");
    }
  }

  joinRoom(): void {}

  //Toast
  // public showSuccess(): void {
  //   this.toastrService.success('Message Success!', 'Title Success!');
  // }

  // public showInfo(): void {
  //   this.toastrService.info('Message Info!', 'Title Info!');
  // }

  // public showWarning(): void {
  //   this.toastrService.warning('Message Warning!', 'Title Warning!');
  // }

  // public showError(): void {
  //   this.toastrService.error('Message Error!', 'Title Error!');
  // }
}
