import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../../model/status";


@Component({
  selector: 'app-status-owner-list',
  templateUrl: './status-owner-list.component.html',
  styleUrls: ['./status-owner-list.component.css']
})
export class StatusOwnerListComponent implements OnInit {
  statuses : any;
  currentId : any;
  id : any;
  statusz: Status;
  constructor(private statusService : StatusService,private activatedRoute : ActivatedRoute,private fb: FormBuilder,private router: Router) {

  }
  statusForm: FormGroup = this.fb.group({
      content: new FormControl(''),
      status: new FormControl(''),
    }
  )
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
