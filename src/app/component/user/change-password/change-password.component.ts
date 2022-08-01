import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {first} from "rxjs";

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
    password: new FormControl(),
    confirmPassword: new FormControl(),
    currentPassword : new FormControl()
  })
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,private authenticationService: AuthenticationService) { }

  changePassword(id : number){
    // @ts-ignore
    if (this.authenticationService.login(this.username,this.userForm.value.currentPassword)){
      const user = {
        password : this.userForm.value.password,
        confirmPassword : this.userForm.value.confirmPassword
      }
      if (this.userForm.value.password == this.userForm.value.confirmPassword){
        // @ts-ignore
        this.userService.updatePassword(id,user,this.userForm.value.currentPassword).subscribe(()=>{
          // @ts-ignore
          document.getElementById("error").style.visibility = "hidden"
          // @ts-ignore
          document.getElementById("sussec").style.visibility = "visible"
          // @ts-ignore
          document.getElementById("fail").style.visibility = "hidden"
        },error => {
          // @ts-ignore
          document.getElementById("error").style.visibility = "visible"
          // @ts-ignore
          document.getElementById("sussec").style.visibility = "hidden"
          // @ts-ignore
          document.getElementById("fail").style.visibility = "hidden"
        });
      }else {
        // @ts-ignore
        document.getElementById("fail").style.visibility = "visible"
      }
    }
  }
  ngOnInit(): void {
  }

}
