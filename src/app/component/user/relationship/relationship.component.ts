import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {RelationshipService} from "../../../service/relationship.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css']
})
export class RelationshipComponent implements OnInit {
  id: any
  user: any
  currentId: any
  relationship: any
  userId1: any
  listFriend: any = [];
  listCheck: any = []

  constructor(private userService: UserService,
              private relationshipService: RelationshipService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    console.log(this.currentId)
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      console.log(this.id)
      this.userService.getUserProfile(this.id).subscribe(data => {
        this.user = data
      })
    })
    this.getAllListFriend()
  }

  getAllListFriend() {
    this.relationshipService.findAllFriendListByUserId(this.id).subscribe(data => {
      console.log("list", data)
      // this.listFriend = data;
      // for (let i = 0; i < this.listFriend.length; i++) {
      //   if (this.currentId != this.relationship.user1.id) {
      //     this.listCheck = this.listFriend;
      //   }
      // }
    })
  }

}
