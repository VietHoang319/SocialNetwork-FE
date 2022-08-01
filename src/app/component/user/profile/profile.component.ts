import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: any
  user: any
  currentId: any

  constructor(private userService : UserService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.userService.getUserProfile(this.id).subscribe(data => {
        this.user = data
        console.log(this.user)
      })
    })
  }

}
