import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameField } from '../../models/gameField.model';

@Injectable({
  providedIn: 'root'
})
export class GameFieldDataService {
  private api = 'https://jusareferees.org/scheduler/api/';

  constructor(private http: HttpClient) { }

  getFields(): Observable<GameField[]> {
    return this.http
      .get(
        `${this.api}getGameFields.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
