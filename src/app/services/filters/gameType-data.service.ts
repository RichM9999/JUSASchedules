import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameType } from '../../models/gameType.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameTypeDataService {
  
  constructor(private http: HttpClient) { }

  getTypes(): Observable<GameType[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameTypes.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
