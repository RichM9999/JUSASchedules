import { Component, OnInit } from '@angular/core';
import { GameDateStatusesDataService } from '../services/gameDateStatuses-data.service';
import { GameDateStatus } from '../models/gameDateStatus';
import { User } from '../models/user';


@Component({
  selector: 'app-open-spots',
  templateUrl: './open-spots.component.html',
  styleUrls: ['./open-spots.component.css']
})
export class OpenSpotsComponent  {

  gameDateStatuses: GameDateStatus[] = [];
  isOdd: boolean = false;
  currentUser: User;

  constructor(private gameDateStatusesService: GameDateStatusesDataService) { 
    this.getGameDateStatuses()
  }

  getGameDateStatuses() {
    this.gameDateStatusesService.getGameDateStatuses()
      .subscribe(g => this.gameDateStatuses = g)
  }

  rowColor(index): string {
    if (index == 0)
    {
      this.isOdd = false;
    }

    this.isOdd = !this.isOdd;

    if (this.isOdd)
      return "gameRowOdd";
    else
      return "gameRowEven";
  }

  isAdmin(): boolean {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.currentUser.isadmin;
  }
  
}
