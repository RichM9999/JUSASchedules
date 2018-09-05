import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameDate } from '../../models/gameDate.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameDateDataService {

  constructor(private http: HttpClient) { }

  getDates(): Observable<GameDate[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameDates.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
