import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SignupResponse } from '../models/signupResponse';

@Injectable({
  providedIn: 'root'
})
export class GameSignupService {
  
  constructor(private http: HttpClient) { }

  /**
   * Queries the Games web service by game date
   */
  doSignup(gameid: number, position: string): Observable<SignupResponse> {
    var data = {
      "gameid": gameid,
      "position": position
     };

    return this.http
      .post(
        `${environment.apiUrl}doSignup.php`,
        JSON.stringify(data)
      )
      .pipe(
        map((response: any) => response)
      );
  }
}
