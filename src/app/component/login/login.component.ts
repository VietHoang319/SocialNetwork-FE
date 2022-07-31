import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.pattern("^[^%,*]*$")]),
    password: new FormControl("", Validators.required)
  });

  constructor(private activatedRoute : ActivatedRoute, private router: Router ,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }
  login() {
    // @ts-ignore
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe(data => {
      console.log(data)
      localStorage.setItem('ACCESS_TOKEN', data.accessToken);
      localStorage.setItem('ROLE', data.roles[0].authority);
      localStorage.setItem('USERNAME', data.username);
      localStorage.setItem('IMAGE', data.image);
      if (data.roles[0].authority == "ROLE_USER") {
        this.router.navigate(['/']);
      }
      // else {
      //   this.router.navigate(['/admin']);
      // }
    }, error => {
      alert("Tài khoản của bạn bị sai")
    })
  }
}
