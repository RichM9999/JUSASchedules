import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameTeam } from '../../models/gameTeam.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameTeamDataService {
  
  constructor(private http: HttpClient) { }

  getTeams(): Observable<GameTeam[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameTeams.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
