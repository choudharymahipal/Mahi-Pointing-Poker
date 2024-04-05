import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../../Services/chat.service";
import { AuthService } from "../../../Services/auth.service";
import { CommonModule } from "@angular/common";

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

  constructor(
    private readonly _chatService: ChatService,
    private readonly _authService: AuthService
  ) {}
  ngOnInit(): void {}

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

  logout():void{
    this._authService.removeAllSession();
  }
}
