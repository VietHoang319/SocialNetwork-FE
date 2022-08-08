import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";
import {LikeStatusService} from "../../../service/like-status.service";

@Component({
  selector: 'app-status-new-feed',
  templateUrl: './status-new-feed.component.html',
  styleUrls: ['./status-new-feed.component.css']
})
export class StatusNewFeedComponent implements OnInit {
  statuses: any;
  currentId: any;
  id: any;
  avatar: any
  fullname: any;
  relationship: any;
  numberStatusOwner: any;
  numberFriend: any;

  constructor(private statusService: StatusService,
              private likeService: LikeStatusService,
              private activatedRoute: ActivatedRoute, private relationshipService: RelationshipService, private router: Router) {

  }

  ngOnInit(): void {
    this.avatar = localStorage.getItem("AVATAR")
    this.fullname = localStorage.getItem("FULLNAME")
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      // this.id = param.get("id");

      this.statusService.findAll(this.currentId).subscribe((status) => {
        this.statuses = status;
        for (let i = 0; i < this.statuses[0].length; i++) {
          this.likeService.check(this.statuses[0][i].id, this.currentId).subscribe(data => {
            this.statuses[0][i].isLiked = data;
          }, error => (
            console.log("err", error)
          ))
        }
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
    this.statusService.findAllByOwnerId(this.currentId).subscribe((status) => {
      this.numberStatusOwner = status;
    })
    this.relationshipService.findAllFriendListByUserId(this.currentId).subscribe(data => {
      this.numberFriend = data;
    })
  }
}
