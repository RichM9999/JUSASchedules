import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameNumber } from '../../models/gameNumber.model';

@Injectable({
  providedIn: 'root'
})
export class GameNumberDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getNumbers(): Observable<GameNumber[]> {
    return this.http
      .get(
        `${this.api}getGameNumbers.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
