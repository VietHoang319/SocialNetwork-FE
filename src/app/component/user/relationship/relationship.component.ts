import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {RelationshipService} from "../../../service/relationship.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private activatedRoute: ActivatedRoute,
              private router : Router) {
  }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.id = this.router.url.split("/")[1];
    this.getAllListFriend(this.id)
    this.getRelationship()
  }

  getAllListFriend(id) {
    this.relationshipService.findAllFriendListByUserId(id).subscribe(data => {
      console.log("list", data)
      this.listFriend = data;
    })
  }

  getRelationship() {
    this.userId1 = localStorage.getItem("ID")
    this.relationshipService.getRelationship(this.userId1, this.id).subscribe(data => {
      this.relationship = data
    })
  }
}
