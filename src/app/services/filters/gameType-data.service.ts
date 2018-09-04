import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameType } from '../../models/gameType.model';

@Injectable({
  providedIn: 'root'
})
export class GameTypeDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getTypes(): Observable<GameType[]> {
    return this.http
      .get(
        `${this.api}getGameTypes.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
