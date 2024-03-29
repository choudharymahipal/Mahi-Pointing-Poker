import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test-chat',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  providers:[ChatService],
  templateUrl: './test-chat.component.html',
  styleUrl: './test-chat.component.scss'
})
export class TestChatComponent implements OnInit{
  messages: any[] = [];
  newMessage: string = 'Hello world';
  uniqueId:string ="";

  constructor(private chatService: ChatService){
    this.uniqueId = this.chatService.generateUniqueId();
  }

  ngOnInit(): void {
    // Join channel

    this.chatService.createChannel(this.uniqueId);

    // Receive new messages
    this.receiveMsg();
  }

  sendMessage(): void {
    this.newMessage="Hello Mahi";
    if (this.newMessage.trim()) {
      const messageData = {
        text: this.newMessage.trim(),
        sender: 'User123',
        channelId: this.uniqueId
      };
      this.chatService.sendMessageInRoom(messageData);
      this.newMessage = '';
    }
  }

  receiveMsg():void{
    this.chatService.receiveMessage(this.uniqueId).subscribe((message: any[]) => {
      console.log("new messages: ",message);
    });
  }

}
