import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() currentUser: User;

  navbarOpen = false;

  constructor() { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  navbarClose() {
    this.navbarOpen = false;
  }

  isAuthenticated() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    if (!this.isAuthenticated())
      return false;

    return this.currentUser.isadmin;
  }

  isSuperAdmin() {
    if (!this.isAuthenticated())
      return false;

      return this.currentUser.issuperadmin;
  }

}
