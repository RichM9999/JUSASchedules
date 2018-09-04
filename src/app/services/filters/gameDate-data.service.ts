import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameDate } from '../../models/gameDate.model';

@Injectable({
  providedIn: 'root'
})
export class GameDateDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getDates(): Observable<GameDate[]> {
    return this.http
      .get(
        `${this.api}getGameDates.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
