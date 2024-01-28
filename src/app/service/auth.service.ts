import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlLogin = "http://localhost:8080/api/auth/login"
  apiUrlPingUser = "http://localhost:8080/api/auth/pingUser"
  apiUrlRegister =  "http://localhost:8080/api/auth/register";

  constructor(
      private http: HttpClient,
      private route: Router
  ) {
    this.route.events
        .pipe(filter((rs): rs is NavigationStart => rs instanceof NavigationStart))
        .subscribe(async event => {
          if (!event.restoredState) {
            const ping = await this.http.get<Observable<boolean>>(`${this.apiUrlPingUser}/${this.getUuid()}`).toPromise().catch(() => this.loggingOut());

            if (!ping) {
              this.loggingOut();
            }
          }
        })
  }

  proceedLogin(usercred: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, usercred);
  }

  proceedRegister(usercred: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, usercred, { responseType: 'text' });
  }

  isLoggedIn() {
    var logginToken = this.getToken();
    let isExpirado: number | undefined | boolean = false;

    if (logginToken) {
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);

      isExpirado = Date.now() <= (_finalData.exp * 1000);

      if (!isExpirado) {
        localStorage.clear();
        this.route.navigate(['login']);
      }
    }

    return isExpirado;
  }

  loggingOut() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem("token") || '';
  }

  getUuid() {
    return localStorage.getItem("uuid") || '';
  }

  haveAccess() {
    var logginToken = this.getToken();
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);

    return _finalData.role === 'admin' && this.isLoggedIn();
  }
}
