import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameTeam } from '../../models/gameTeam.model';

@Injectable({
  providedIn: 'root'
})
export class GameTeamDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<GameTeam[]> {
    return this.http
      .get(
        `${this.api}getGameTeams.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
