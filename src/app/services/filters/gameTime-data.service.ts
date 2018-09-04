import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameTime } from '../../models/gameTime.model';

@Injectable({
  providedIn: 'root'
})
export class GameTimeDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getTimes(): Observable<GameTime[]> {
    return this.http
      .get(
        `${this.api}getGameTimes.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
