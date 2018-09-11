import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssignResponse } from '../models/assignResponse';

@Injectable({
  providedIn: 'root'
})
export class GameSetNumberOfRefsService {
  
  constructor(private http: HttpClient) { }

  setNumberOfRefs(gameid: number, numberofrefs: number): Observable<AssignResponse> {
    var data = {
      "gameid": gameid,
      "numberofrefs": numberofrefs
     };

    return this.http
      .post(
        `${environment.apiUrl}setNumberOfRefs.php`,
        JSON.stringify(data)
      )
      .pipe(
        map((response: any) => response)
      );
  }
}
