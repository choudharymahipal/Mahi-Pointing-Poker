import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PokerRoomComponent } from './Components/poker-room/poker-room.component';

export const routes: Routes = [
  { path: '', component: PokerRoomComponent },
  { path: 'room/{id}', component: PokerRoomComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }