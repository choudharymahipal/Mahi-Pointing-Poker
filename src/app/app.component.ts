import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ChatService } from './Services/chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,ReactiveFormsModule,HttpClientModule,FormsModule,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  newMessage!: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService){

  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  createRoom(){
    this.chatService.createRoom("room1");
  }
}
