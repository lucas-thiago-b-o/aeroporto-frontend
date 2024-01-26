import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlLogin = "http://localhost:8080/api/auth/login"
  apiUrlRegister =  "http://localhost:8080/api/auth/register";

  constructor(
      private http: HttpClient,
      private route: Router
  ) { }

  proceedLogin(usercred: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, usercred);
  }

  proceedRegister(usercred: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, usercred, { responseType: 'text' });
  }

  isLoggedIn() {
    var logginToken = localStorage.getItem("token");
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

  haveAccess() {
    var logginToken = localStorage.getItem("token") || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);

    return _finalData.role === 'admin' && this.isLoggedIn();
  }
}
