import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { PokerRoomComponent } from "./Components/poker-room/poker-room.component";
import { TestChatComponent } from "./Components/test-chat/test-chat.component";
import { PokerCardComponent } from "./Components/poker-card/poker-card.component";

export const routes: Routes = [
  //{ path: "", component: TestChatComponent },
  { path: "", component: HomeComponent },
  { path: "room", component: PokerRoomComponent },
  { path: "card", component: PokerCardComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
