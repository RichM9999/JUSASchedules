import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameReferee } from '../../models/gameReferee.model';

@Injectable({
  providedIn: 'root'
})
export class GameRefereeDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getReferees(): Observable<GameReferee[]> {
    return this.http
      .get(
        `${this.api}getGameReferees.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
