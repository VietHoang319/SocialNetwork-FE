import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {first} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  // @ts-ignore
  id = parseInt(localStorage.getItem("ID"));
  username = localStorage.getItem("USERNAME")
  userForm: FormGroup = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    currentPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
  })

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toast : NgToastService) {
  }

  changePassword(id: number) {
    // @ts-ignore
    if (this.authenticationService.login(this.username, this.userForm.value.currentPassword)) {
      const user = {
        password: this.userForm.value.password,
        confirmPassword: this.userForm.value.confirmPassword
      }
      if (this.userForm.value.password == this.userForm.value.confirmPassword) {
        // @ts-ignore
        this.userService.updatePassword(id, user, this.userForm.value.currentPassword).subscribe(() => {
          this.toast.success({detail: "Thông Báo", summary: "Đổi mật khẩu thành công", duration: 3000, position: "br"})
          // @ts-ignore
          document.getElementById("error").style.visibility = "hidden"
          // @ts-ignore
          document.getElementById("success").style.visibility = "visible"
          // @ts-ignore
          document.getElementById("fail").style.visibility = "hidden"
        }, error => {
          // @ts-ignore
          document.getElementById("error").style.visibility = "visible"
          // @ts-ignore
          document.getElementById("success").style.visibility = "hidden"
          // @ts-ignore
          document.getElementById("fail").style.visibility = "hidden"
        });
      } else {
        // @ts-ignore
        document.getElementById("fail").style.visibility = "visible"
        // @ts-ignore
        document.getElementById("error").style.visibility = "hidden"
      }
    }
  }

  get currentPassword() {
    return this.userForm.get('currentPassword');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  ngOnInit(): void {
  }

}
