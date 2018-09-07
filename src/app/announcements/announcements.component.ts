import { Component } from '@angular/core';
import {AnnouncementsDataService} from '../services/announcements-data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

  currentUser: User;
  announcements: string;

  constructor(private announcementsService: AnnouncementsDataService) { 
    this.getAnnouncements();
  }

  getAnnouncements() {
    this.announcementsService.getAnnouncements()
      .subscribe(g => this.announcements = g.length > 0 ? g[0].message : "" );
  }

  seasonName(): string {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.currentUser.seasonname;
  }
}
