import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-poker-room',
  standalone: true,
  imports:[],
  templateUrl: './poker-room.component.html',
  styleUrl: './poker-room.component.scss'
})
export class PokerRoomComponent implements OnInit {
  socket: any;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
  }
}
