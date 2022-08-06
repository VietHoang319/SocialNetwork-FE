import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";
import {Status} from "../../../model/status";
import {Image} from "../../../model/image";
import {ImageService} from "../../../service/image.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpStatusCode} from "@angular/common/http";
import {timeoutWith} from "rxjs";


@Component({
  selector: 'app-status-owner-list',
  templateUrl: './status-owner-list.component.html',
  styleUrls: ['./status-owner-list.component.css']
})
export class StatusOwnerListComponent implements OnInit {
  statuses: Status [] = [];
  currentId: any;
  id: any;
  relationship: any;
  relationshipStatus : any;
  statuz: Status [] = [];
  img : Image [] = [];
  image : Image [] = [];
  constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, private router: Router, private relationshipService: RelationshipService,
              private imageService : ImageService) {

  }



  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.relationshipService.findAllFriendListByUserId(this.currentId).subscribe(data => {
      this.relationship = data;
    })
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
    })
    this.relationshipService.getRelationship(this.currentId,this.id).subscribe(data => {
      this.relationshipStatus = data;
      this.statusService.findAllByOwnerId(this.id).subscribe((status) => {
        this.statuz = status;
        for (let i = 0; i <= status.length; i++) {
          if (this.currentId == this.id) {
            this.statuses.push(status[i])
            this.statuses.push(this.statuz[0][i])
            this.imageService.findByIdStatus(this.statuz[1][i][i].id).subscribe((images) =>{
              this.img.push(images)
            })
          }
          else {
            if ((this.statuz[0][i].status == 1 || this.statuz[0][i].status == 3) && this.relationshipStatus.status == 2){
              this.statuses.push(this.statuz[0][i])
              this.imageService.findByIdStatus(this.statuz[1][i][i].id).subscribe((images) =>{
                this.img.push(images)
              })
            }
            else if (this.statuz[0][i].status == 1 ){
              alert(2)
              console.log(this.relationshipStatus)
              this.statuses.push(this.statuz[0][i])
              this.imageService.findByIdStatus(this.statuz[1][i][i].id).subscribe((images) =>{
                this.img.push(images)
              })
            }
          }
        }
      })
    })

  }


}
