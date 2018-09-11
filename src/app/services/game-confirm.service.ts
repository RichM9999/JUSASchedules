import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssignResponse } from '../models/assignResponse';

@Injectable({
  providedIn: 'root'
})
export class GameConfirmService {
  
  constructor(private http: HttpClient) { }

  doConfirm(gameid: number, position: string): Observable<AssignResponse> {
    var data = {
      "gameid": gameid,
      "position": position
     };

    return this.http
      .post(
        `${environment.apiUrl}doConfirm.php`,
        JSON.stringify(data)
      )
      .pipe(
        map((response: any) => response)
      );
  }
}
