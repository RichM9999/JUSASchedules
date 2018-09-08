import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GameDateStatus } from '../models/gameDateStatus';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameDateStatusesDataService {
  
  constructor(private http: HttpClient) { }

  getGameDateStatuses(): Observable<GameDateStatus[]> {
    return this.http
      .get(
        `${environment.apiUrl}getGameDateStatuses.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
