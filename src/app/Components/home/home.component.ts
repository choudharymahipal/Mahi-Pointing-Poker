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
import { AppComponent } from "../../app.component";
import { CommonService } from "../../Services/common.service";
//import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[CommonService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  cardForm!: FormGroup;
  allRooms: any[] = [];

  constructor(
    private route: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private commonService: CommonService,
    private appCom: AppComponent,
    private fb: FormBuilder //private toastrService: ToastrService
  ) {
    this.appCom.userJoinedRoom = false;
    this.appCom.inRoomPage = false;

    this.cardForm = this.fb.group({
      roomId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    //Clear all sessions when home page loaded.
    this.authService.removeAllSession();
  }

  ngDoCheck(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.chatService.getAllRooms().subscribe((data: string[]) => {
      this.allRooms = [];
      this.allRooms = data;
    });
  }

  //Create only session when user click on create room
  createRoom(): void {
    let uniqueId = this.commonService.generateUniqueRoomId();
    this.authService.createRoomSession(uniqueId);
    this.route.navigateByUrl("/card");
  }

  //for join user
  checkRoomIsExistOrNot(): void {
    let _roomId = this.cardForm.get("roomId")?.value;
    if (_roomId) {
      //check room is active or not
      if (this.allRooms.find((x: any) => x === _roomId)) {
        this.authService.joinRoomSession(_roomId);
        this.route.navigateByUrl("/card");
      } else {
        alert("Room not found");
      }
    } else {
      alert("Please provide room Id to join session");
    }
  }

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
