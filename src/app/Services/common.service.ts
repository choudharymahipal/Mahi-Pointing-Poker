import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuid } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  //constructor(private toastrService: ToastrService ) { }

  //Generate unique user id
  generateUniqueUserId(): string {
    const id: string = uuid();
    return id;
  }
  //Generate unique room id (should be small)
  generateUniqueRoomId(): string {
    const time = new Date();
    let hour = time.getHours();
    let minuts = time.getMinutes();
    let seconds = time.getSeconds();
    let ms = time.getMilliseconds();
    let finalId = "" + hour + minuts + seconds + ms;
    return finalId;
  }

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
