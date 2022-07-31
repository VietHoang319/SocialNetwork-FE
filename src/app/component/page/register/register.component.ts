import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/authentication.service";
import {Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    email:new FormControl('',[Validators.required, Validators.email]),
    phone:new FormControl('', [Validators.required,Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    birthday:new FormControl('' , [Validators.required])
  });

  get username(){
    return this.registerForm.get('username')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  get email(){
    return this.registerForm.get('email')
  }

  get phone(){
    return this.registerForm.get('phone')
  }

  get birthday(){
    return this.registerForm.get('birthday')
  }

  constructor(private authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
  }

  register() {
    const user = this.setNewUser();
    this.authenticationService.register(user).subscribe((data) => {
      this.registerForm.reset();
      // this.router.navigate(['/login']);
    }, err => {
      if(err.error == "Tên người dùng đã tồn tại"){
        // @ts-ignore
        document.getElementById("check-username").style.display="block"
      }
      if(err.error == "Email đã tồn tại"){
        // @ts-ignore
        document.getElementById("check-email").style.display="block"
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
      email:this.registerForm.value.email,
      phone:this.registerForm.value.phone,
      birthday:this.registerForm.value.birthday,
      avatar:"src/assets/assets/images/avatar/placeholder.jpg"
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
