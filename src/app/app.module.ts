import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./Components/home/home.component";
import { PokerCardComponent } from "./Components/poker-card/poker-card.component";
import { PokerRoomComponent } from "./Components/poker-room/poker-room.component";
import { HeaderComponent } from "./Shared/Components/header/header.component";
import { FooterComponent } from "./Shared/Components/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./Services/auth.service";
import { ChatService } from "./Services/chat.service";
import { CommonService } from "./Services/common.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokerCardComponent,
    PokerRoomComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [AuthService, ChatService, CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
