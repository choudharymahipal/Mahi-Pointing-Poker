import { Component } from "@angular/core";
import { ChatService } from "./Services/chat.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  newMessage!: string;
  messageList: string[] = [];
  userJoinedRoom: boolean = false;
  inRoomPage: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
