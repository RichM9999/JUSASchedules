import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NextGame } from '../models/nextGame.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyNextGamesDataService {
  
  constructor(private http: HttpClient) { }

  getMyNextGames(): Observable<NextGame[]> {
    return this.http
      .get(
        `${environment.apiUrl}getMyNextGames.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
