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
  currentId: any;
  id: any;
  relationship: any;
  statuz: Status [] = [];
  img: Image [] = [];
  image: Image [] = [];

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
      this.statusService.findAllByOwnerId(this.id).subscribe((status) => {
        this.statuz = status;
        for (let i = 0; i <= status.length; i++) {
          if (this.currentId == this.id) {
            this.statuses.push(status[i])
            this.statuses.push(this.statuz[0][i])
            this.imageService.findByIdStatus(this.statuz[1][i][i].id).subscribe((images) => {
              this.img.push(images)
            })
          } else {
            console.log(this.relationship)
            if (this.statuz[0][i].status == 1 && this.relationship == null) {
              console.log(this.relationship)
              this.statuses.push(this.statuz[0][i])
              this.imageService.findByIdStatus(this.statuz[1][i][i].id).subscribe((images) => {
                this.img.push(images)
              })
            }
            if ((this.statuz[0][i].status == 1 && this.relationship.status == 2) || (this.statuz[0][i].status == 3 && this.relationship.status == 2)) {
              this.statuses.push(this.statuz[0][i])
              this.imageService.findByIdStatus(this.statuz[1][i][i].id).subscribe((images) => {
                this.img.push(images)
              })
            }
          }
        }
      })
    })

  }


}
