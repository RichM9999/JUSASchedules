import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameTime } from '../../models/gameTime.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameTimeDataService {
  
  constructor(private http: HttpClient) { }

  getTimes(): Observable<GameTime[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameTimes.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
