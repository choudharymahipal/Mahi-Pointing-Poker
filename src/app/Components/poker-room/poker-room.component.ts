import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { PokerCardComponent } from '../poker-card/poker-card.component';

@Component({
  selector: 'app-poker-room',
  standalone: true,
  imports:[PokerCardComponent],
  templateUrl: './poker-room.component.html',
  styleUrl: './poker-room.component.scss'
})
export class PokerRoomComponent implements OnInit {
  socket: any;
  isShowVotes:boolean = true;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
  }

  changeShowHideVotes(){
    this.isShowVotes = !this.isShowVotes;
  }

  clearVotes(){
    //clear votes 
    this.isShowVotes=true;
  }
}
