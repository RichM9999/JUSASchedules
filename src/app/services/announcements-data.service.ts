import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Announcement } from '../models/announcement.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsDataService {
  
  constructor(private http: HttpClient) { }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http
      .get(
        `${environment.apiUrl}getAnnouncements.php`
      )
      .pipe(
        map((response: any) => response.value)
      );
  }
}
