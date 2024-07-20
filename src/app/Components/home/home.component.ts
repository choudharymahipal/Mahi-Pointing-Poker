import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../../Services/chat.service";
import { AuthService } from "../../Services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppComponent } from "../../app.component";
import { CommonService } from "../../Services/common.service";
import { ISession, IVisitedUser } from "../../Shared/Models/iSession";
//import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  cardForm!: FormGroup;
  allRooms: any[] = [];
  totalVisited: number = 0;
  totalRooms: number = 0;
  totalUsers: number = 0;

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
    this.commonService.getVisitedCount().subscribe((res) => {
      if (res) {
        this.totalVisited = res;
      }
    });
    this.updateVisitedUsers();
    this.getAllRooms();
    this.getAllUsers();
  }

  updateVisitedUsers(): void {
    this.commonService.getIpClient().subscribe((res) => {
      if (res) {
        try {
          let obj = {
            IP: res.IPv4,
            Country: res.country_name,
          };

          //Read json file
          this.commonService.getVisitedUsers().subscribe((res: any) => {
            if (res) {
              //parse json
              var fileData = res;
              //if file is already empty
              if (fileData.length > 0) {
                //check new ip is already exist or not
                let existDataLen = fileData.findIndex(
                  (x: IVisitedUser) => x.IP === obj.IP
                );
                //if not then save it
                if (existDataLen === 0) {
                  fileData.push(obj);
                  this.commonService.updateVisitedUser(fileData);
                }
              } else {
                //direct push it
                fileData.push(obj);
                this.commonService.updateVisitedUser(fileData);
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  getAllRooms(): void {
    this.chatService.getAllRooms().subscribe((data: string[]) => {
      this.allRooms = [];
      if (data) {
        this.allRooms = [...new Set(data.map(item => item))];
        this.totalRooms = [...new Set(data.map(item => item))].length;
      }
    });
  }

  getAllUsers(): void {
    this.chatService.getAllUsers().subscribe((data: ISession[]) => {
      this.totalUsers=0;
      if (data) {
        this.totalUsers = data.length;
      }
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
