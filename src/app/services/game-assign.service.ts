import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssignResponse } from '../models/assignResponse';

@Injectable({
  providedIn: 'root'
})
export class GameAssignService {
  
  constructor(private http: HttpClient) { }

  doAssign(gameid: number, crid: number, ar1id: number, ar2id: number): Observable<AssignResponse> {
    var data = {
      "gameid": gameid,
      "crid": crid,
      "ar1id": ar1id,
      "ar2id": ar2id
     };

    return this.http
      .post(
        `${environment.apiUrl}doAssign.php`,
        JSON.stringify(data)
      )
      .pipe(
        map((response: any) => response)
      );
  }
}
