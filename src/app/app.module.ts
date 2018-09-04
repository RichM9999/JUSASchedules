import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { DataTableModule } from "angular-6-datatable";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { GameScheduleComponent } from './game-schedule/game-schedule.component'
import { RefereeListComponent } from './referee-list/referee-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdministrationComponent } from './administration/administration.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageBoardComponent,
    MyScheduleComponent,
    GameScheduleComponent,
    RefereeListComponent,
    MyProfileComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    RoutingModule,
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  isAdmin: boolean = false;

}
