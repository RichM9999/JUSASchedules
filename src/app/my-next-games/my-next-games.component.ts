import { Component, OnInit } from '@angular/core';

import { NextGame } from '../models/nextGame.model';

import { MyNextGamesDataService } from '../services/myNextGames-data.service';


@Component({
  selector: 'app-my-next-games',
  templateUrl: './my-next-games.component.html',
  styleUrls: ['./my-next-games.component.css']
})
export class MyNextGamesComponent {

  myNextGames: NextGame[] = [];
  isOdd: boolean = false;

  constructor(private nextGamesService: MyNextGamesDataService
  ) { 
    this.getMyNextGames(); 
  }

  getMyNextGames() {
    this.nextGamesService.getMyNextGames()
      .subscribe(g => this.myNextGames = g)
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

}
