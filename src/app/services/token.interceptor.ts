import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { tap, map, catchError, flatMap } from "rxjs/operators";

const AuthUrl: string = 'https://jusareferees.org/scheduler/api/key.php';
const TokenName: string = 'bearer-token';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  /**
   * This intercepts all http calls made and adds an auth token to the request header. 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === AuthUrl) {
      return next.handle(req);
    }

    return next.handle(this.addToken(req, this.getToken()))
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          }
        }),
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {          
            if (error.status === 401) {
              return this.requestToken().pipe(flatMap(token => {
                return next.handle(this.addToken(req, this.getToken()));
              }));
            }
            return Observable.throw(error);
          }
        })
      );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token } });
  }

  private getToken(): string {
    const currentSession = JSON.parse(localStorage.getItem(TokenName));
    return currentSession && currentSession.token;
  }

  private requestToken(): Observable<string> {
    const currentSession = JSON.parse(localStorage.getItem(TokenName));
    if (currentSession && !!currentSession.token && new Date(currentSession.expiresAt) > new Date()) {
      return of(currentSession.token);
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let params = `grant_type=password&username=kmabry&password=1025`;

    return this.http
      .post(AuthUrl, params, { headers: headers })
      .pipe(
        tap((r: any) => {
          localStorage.setItem(TokenName, JSON.stringify({
            token: r.access_token,
            expiresAt: new Date(new Date().getTime() + r.expires_in * 1000)
          }));
        }),
        map((r: any) => r.access_token));
  }
}
