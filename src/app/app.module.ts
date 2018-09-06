import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { DataTableModule } from "angular-6-datatable";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './directives';
import { AuthGuard } from './guards';

import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';

import { NavbarComponent } from './navbar/navbar.component';
import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { GameScheduleComponent } from './game-schedule/game-schedule.component'
import { RefereeListComponent } from './referee-list/referee-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdministrationComponent } from './administration/administration.component'
import { LogoutComponent } from './logout';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    RoutingModule,
    NgSelectModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,    
    LogoutComponent,
    NavbarComponent,
    LoginComponent,
    MessageBoardComponent,
    MyScheduleComponent,
    GameScheduleComponent,
    RefereeListComponent,
    MyProfileComponent,
    AdministrationComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
