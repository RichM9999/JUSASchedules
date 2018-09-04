import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { MessageBoardComponent } from './message-board/message-board.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { GameScheduleComponent } from './game-schedule/game-schedule.component';
import { RefereeListComponent } from './referee-list/referee-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component'
import { AdministrationComponent } from './administration/administration.component';

const routes: Routes = [
    { path: '', component: MessageBoardComponent },
    { path: 'messageboard', component: MessageBoardComponent },
    { path: 'myschedule', component: MyScheduleComponent },
    { path: 'schedules', component: GameScheduleComponent },
    { path: 'referees', component: RefereeListComponent },
    { path: 'myprofile', component: MyProfileComponent },
    { path: 'administration', component: AdministrationComponent },

];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
