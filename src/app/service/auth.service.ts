import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:8080/auth/login"

  constructor(private http:HttpClient) { }

  proceedLogin(usercred: any) {
    return this.http.post(this.apiUrl, usercred);
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
    /*if (_finalData.role === 'admin') {
      return true;
    }*/
    // console.log("you not having access");
    console.log(_finalData);
  }
}
