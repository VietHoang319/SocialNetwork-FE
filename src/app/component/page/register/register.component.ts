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
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required, Validators.email]),
    phone:new FormControl('', [Validators.required,Validators.pattern("/(03|05|07|08|09)+([0-9]{8})")]),
    birthday:new FormControl('')
  });
  constructor(private authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
  }

  register() {
    const user = this.setNewUser();
    this.authenticationService.register(user).subscribe((data) => {
      console.log(data);
      alert("thành công")
      this.registerForm.reset();
      // this.router.navigate(['/login']);
    }, err => {
      console.log(err);
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

}
