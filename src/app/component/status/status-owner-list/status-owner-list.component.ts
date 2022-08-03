import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-status-owner-list',
  templateUrl: './status-owner-list.component.html',
  styleUrls: ['./status-owner-list.component.css']
})
export class StatusOwnerListComponent implements OnInit {
  statuses : any;
  currentId : any;
  id : any;
  constructor(private statusService : StatusService,private activatedRoute : ActivatedRoute,private fb: FormBuilder,private router: Router) {

  }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.statusService.findAllByOwnerId(this.id).subscribe((status) =>{
        this.statuses = status;
        console.log(status)
      })
    })

  }

}
