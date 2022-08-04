import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";

@Component({
  selector: 'app-status-new-feed',
  templateUrl: './status-new-feed.component.html',
  styleUrls: ['./status-new-feed.component.css']
})
export class StatusNewFeedComponent implements OnInit {
  statuses : any;
  currentId : any;
  id : any;
  avatar :any
  fullname : any;
  relationship: any;

  constructor(private statusService : StatusService,private activatedRoute : ActivatedRoute,private relationshipService: RelationshipService,private router: Router) {

  }

  ngOnInit(): void {
    this.avatar = localStorage.getItem("AVATAR")
    this.fullname = localStorage.getItem("FULLNAME")
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.statusService.findAll(this.currentId).subscribe((status) =>{
        this.statuses = status;
        console.log(status)
      })
    })

  }
}
