import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokerRoomComponent } from './poker-room/poker-room.component';

export const routes: Routes = [
  { path: '', component: PokerRoomComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }