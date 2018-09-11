import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameNoteService {
  
  constructor(private http: HttpClient) { }

  deleteNote(noteid: number) {
    var data = {
      "noteid": noteid
     };

    return this.http
      .post(
        `${environment.apiUrl}deleteNote.php`,
        JSON.stringify(data)
      )
      .pipe(
        map((response: any) => response)
      );
  }
}
