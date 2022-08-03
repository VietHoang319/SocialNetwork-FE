import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {RelationshipService} from "../../../service/relationship.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: any
  user: any
  currentId: any
  relationship: any
  userId1: any

  constructor(private userService: UserService,
              private relationshipService: RelationshipService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.userService.getUserProfile(this.id).subscribe(data => {
        this.user = data
        console.log(this.user)
      })
    })

    this.getRelationship()
  }

  getRelationship() {
    this.userId1 = localStorage.getItem("ID")
    this.relationshipService.getRelationship(this.userId1, this.id).subscribe(data => {
      console.log(data);
      this.relationship = data
    })
  }

  addFriend() {
    const relationship = {
      user1: {
        id: localStorage.getItem("ID")
      },
      user2: {
        id: this.id
      },
    }
    console.log(relationship)
    this.relationshipService.addFiend(relationship).subscribe(data => {
      this.relationship = data;
    })
  }

  deleteRelationship() {
    this.relationshipService.deleteRelationship(this.relationship.id).subscribe(id => {
      console.log(id)
      this.relationship = null;
    })
  }

  friendConfirmation() {
    this.relationshipService.friendConfirmation(this.relationship.id).subscribe(data => {
      this.relationship.status=2
    })
  }
}
