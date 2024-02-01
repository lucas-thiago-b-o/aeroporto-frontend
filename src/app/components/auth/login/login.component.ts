import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('USER')
  });

  constructor(
      private service: AuthService,
      private route: Router
  ) { }

  ngOnInit(): void {
  }

  proceedLogin(formValue: any) {
    this.service.proceedLogin({username: formValue.username, password: formValue.password}).subscribe(result => {
      if (result) {
        const jwtDecoder = jwtDecode(result.token);
        localStorage.setItem('token', result.token);
        localStorage.setItem('uuid', <string>jwtDecoder.jti);
        this.route.navigate(['']);
      }
    }, (error) => {
      alert(error.error);
    });
  }

  proceedRegister(formValue: any) {
    this.service.proceedRegister(formValue).subscribe(result => {
      if (result) {
        alert(result);
      }
    }, (error) => {
      alert(error.error);
    });
  }

  submitLogin() {
    if (this.form.valid) {
      this.proceedLogin(this.form.value);
    }
  }

  submitRegister() {
    if (this.form.valid) {
      this.proceedRegister(this.form.value);
    }
  }

}
