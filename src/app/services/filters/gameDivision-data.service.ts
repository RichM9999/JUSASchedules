import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameDivision } from '../../models/gameDivision.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameDivisionDataService {

  constructor(private http: HttpClient) { }

  getDivisions(): Observable<GameDivision[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameDivisions.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
