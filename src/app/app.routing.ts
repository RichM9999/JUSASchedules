import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { MessageBoardComponent } from './message-board/message-board.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { GameScheduleComponent } from './game-schedule/game-schedule.component';
import { RefereeListComponent } from './referee-list/referee-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component'
import { AdministrationComponent } from './administration/administration.component';
import { LogoutComponent } from './logout';
import { LoginComponent } from './login';
import { AuthGuard } from './guards';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'messageboard', component: MessageBoardComponent, canActivate: [AuthGuard] },
    { path: 'myschedule', component: MyScheduleComponent, canActivate: [AuthGuard] },
    { path: 'schedules/:gamedate/:refereeid', component: GameScheduleComponent, canActivate: [AuthGuard] },
    { path: 'referees', component: RefereeListComponent, canActivate: [AuthGuard] },
    { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
    { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard] },
    { path: 'logout', component: LogoutComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
