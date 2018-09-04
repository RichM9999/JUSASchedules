import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameDivision } from '../../models/gameDivision.model';

@Injectable({
  providedIn: 'root'
})
export class GameDivisionDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getDivisions(): Observable<GameDivision[]> {
    return this.http
      .get(
        `${this.api}getGameDivisions.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
