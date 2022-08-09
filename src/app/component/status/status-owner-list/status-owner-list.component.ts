import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";
import {Status} from "../../../model/status";
import {Image} from "../../../model/image";
import {ImageService} from "../../../service/image.service";


@Component({
  selector: 'app-status-owner-list',
  templateUrl: './status-owner-list.component.html',
  styleUrls: ['./status-owner-list.component.css']
})
export class StatusOwnerListComponent implements OnInit {
  statuses: Status [] = [];
  statusesOwner : Status [] = [];
  currentId: any;
  id: any;
  relationship: any;
  statuz: Status [] = [];
  numberOfLike : any;

  constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, private router: Router, private relationshipService: RelationshipService,
              private imageService: ImageService) {

  }


  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
    })
    this.relationshipService.getRelationship(this.currentId, this.id).subscribe(data => {
      this.relationship = data;
    })
    this.statusService.findAllByOwnerId(this.id).subscribe((status) => {
     this.statusesOwner = status;
    })
  }


}
