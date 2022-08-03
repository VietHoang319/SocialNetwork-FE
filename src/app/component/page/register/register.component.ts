import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/authentication.service";
import {Router} from "@angular/router";
import {User} from "../../../model/user";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    birthday: new FormControl('', [Validators.required])
  });

  get username() {
    return this.registerForm.get('username')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get phone() {
    return this.registerForm.get('phone')
  }

  get birthday() {
    return this.registerForm.get('birthday')
  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toast : NgToastService) {
  }

  ngOnInit(): void {
  }

  register() {
    const user = this.setNewUser();
    this.authenticationService.register(user).subscribe((data) => {
      this.toast.success({detail: "Thông Báo", summary: "Đăng ký thành công", duration: 3000, position: "br"})
      this.router.navigate(['/login']);
      this.registerForm.reset();
    }, err => {
      if (err.error == "Tên người dùng đã tồn tại") {
        // @ts-ignore
        document.getElementById("check-username").style.display = "block"
      }
      if (err.error == "Email đã tồn tại") {
        // @ts-ignore
        document.getElementById("check-email").style.display = "block"
      }
      console.log(err.error);
    });
    console.log(user);
  }

  private setNewUser() {
    // @ts-ignore
    const user: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      birthday: this.registerForm.value.birthday,
      avatar: "https://firebasestorage.googleapis.com/v0/b/socialnetwork-f5a61.appspot.com/o/placeholder.jpg?alt=media&token=9e94915b-2d37-4ca9-939e-28195a28ed90"
    };
    return user;
  }

  checkConfirmPassword() {
    if (this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value) {
      // @ts-ignore
      document.getElementById("abc").style.display = "block";
    }
  }
}
