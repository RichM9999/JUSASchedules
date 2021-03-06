import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { tap, map, catchError, flatMap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service'; 
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

const TokenName: string = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private count: number = 0;

  constructor(private http: HttpClient
      , private authenticationService: AuthenticationService
      , private spinnerService: Ng4LoadingSpinnerService
    ) { }

  /**
   * This intercepts all http calls made and adds an auth token to the request header. 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === environment.keyUrl) {
      return next.handle(req);
    }

    this.count++;

    if (this.count == 1) 
      this.spinnerService.show();

    return next.handle(this.addToken(req, this.getToken()))
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          }
        }),
        catchError((error: any) => {
          this.count--;

          if (error instanceof HttpErrorResponse) {          
            if (error.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);               
            }
            return Observable.throw(error);
          }
        }),
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) { 
            this.count--;
            if (this.count==0)
               this.spinnerService.hide();
         }
        })
      );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
  }

  private getToken(): string {
    const currentSession = JSON.parse(localStorage.getItem(TokenName));
    return currentSession && currentSession.access_token;
  }

  private requestToken(): Observable<string> {
    const currentSession = JSON.parse(localStorage.getItem(TokenName));
    if (currentSession && !!currentSession.access_token && new Date(currentSession.expiration * 1000) > new Date()) {
      return of(currentSession.access_token);
    }
  }
}
