import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({templateUrl: 'logout.component.html'})
export class LogoutComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService,
        private router: Router) {}

    ngOnInit() {
        this.authenticationService.logout();
        location.href = "/";
    }
}
