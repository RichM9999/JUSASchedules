import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameReferee } from '../../models/gameReferee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameRefereeDataService {
  
  constructor(private http: HttpClient) { }

  getReferees(): Observable<GameReferee[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameReferees.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
