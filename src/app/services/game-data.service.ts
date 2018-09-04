import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  /**
   * Queries the Games web service by game date
   */
  searchByDate(gameNumber: string, gameDivision: string, gameType: string, gameDate: string, gameTime: string, gameField: string, gameTeam: string, gameReferee: number, orderBy: string): Observable<Game[]> {
    return this.http
      .get(
        `${this.api}getGames.php?gameNumber=${gameNumber}&gameDivision=${gameDivision}&gameType=${gameType}&gameDate=${gameDate}&gameTime=${gameTime}&gameField=${gameField}&gameTeam=${gameTeam}&gameReferee=${gameReferee}&orderBy=${orderBy}`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
