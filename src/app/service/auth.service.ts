import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlLogin = "http://localhost:8080/api/auth/login"
  apiUrlRegister =  "http://localhost:8080/api/auth/register";

  constructor(private http:HttpClient) { }

  proceedLogin(usercred: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, usercred);
  }

  proceedRegister(usercred: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, usercred, { responseType: 'text' });
  }

  isLoggedIn() {
    return localStorage.getItem("token") != null;
  }

  getToken() {
    return localStorage.getItem("token") || '';
  }

  haveAccess() {
    var logginToken = localStorage.getItem("token") || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);
     if (_finalData.role === 'admin') {
      return true;
     }
    alert("you not having access");
    return false;
  }
}
