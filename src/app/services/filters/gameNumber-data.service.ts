import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameNumber } from '../../models/gameNumber.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameNumberDataService {
  
  constructor(private http: HttpClient) { }

  getNumbers(): Observable<GameNumber[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameNumbers.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
