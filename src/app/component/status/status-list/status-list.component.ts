import { Component, OnInit } from '@angular/core';
import {Status} from "../../../model/status";
import {StatusService} from "../../../service/status.service";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {
  statuss: Status[] = [];
  users: User[] = [];
  constructor(private statusService: StatusService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.showAll();
  }

  showAll(){
    this.statusService.findAll().subscribe((status) =>{
      this.statuss = status;
      console.log(this.statuss);
    },error => {
      console.log(error);
    })
  }
}
