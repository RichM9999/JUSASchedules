import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameField } from '../../models/gameField.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameFieldDataService {
  
  constructor(private http: HttpClient) { }

  getFields(): Observable<GameField[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameFields.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
