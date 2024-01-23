import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
      private service: AuthService,
      private route: Router
  ) { }

  ngOnInit(): void {

  }

  proceedLogin(formValue: any) {
    this.service.proceedLogin(formValue).subscribe(result => {
      if (result) {
        console.log(result);
        //localStorage.setItem('token', result);
        //this.route.navigate(['']);
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.proceedLogin(this.form.value);
    }
  }

}
