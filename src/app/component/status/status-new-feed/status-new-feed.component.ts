import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RelationshipService} from "../../../service/relationship.service";
import {Status} from "../../../model/status";
import {NgToastService} from "ng-angular-popup";
import {LikeStatusService} from "../../../service/like-status.service";

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
  numberStatusOwner: any;
  numberFriend: any;
  statusForm: FormGroup = this.fb.group({
      content: new FormControl(''),
      status: new FormControl(''),
    }
  )
  statusz: Status = {
    owner: {
      id: 0,
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      birthday: "",
      fullname: "",
      avatar: "",
      address: "",
      hobby: "",
      enabled: false,
      roles: [undefined]
    },
    content: "",
    createAt: "",
    id: 0,
    status: ""
  };
  constructor(private statusService : StatusService,private activatedRoute : ActivatedRoute,private relationshipService: RelationshipService,private router: Router,
              private fb: FormBuilder,private toast: NgToastService,
              private likeStatusService : LikeStatusService) {

  }

  ngOnInit(): void {
    this.avatar = localStorage.getItem("AVATAR")
    this.fullname = localStorage.getItem("FULLNAME")
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.statusService.findAll(this.currentId).subscribe((status) =>{
        this.statuses = status;
      })
    })

    this.statusService.findAllByOwnerId(this.currentId).subscribe((status) => {
      this.numberStatusOwner = status;
    })
    this.relationshipService.findAllFriendListByUserId(this.currentId).subscribe(data => {
      this.numberFriend = data;
      this.relationship = data;
    })
  }
  getStatus(id) {
    this.statusService.getById(id).subscribe(result => {
      this.statusz = result;
      console.log(result);
    }, error => {
      console.log(error);
    })
  }

  editStatus() {
    // @ts-ignore
    const status: Status = {
      content: this.statusForm.value.content,
      status: this.statusForm.value.status,
    }
    console.log(status);
    // @ts-ignore
    this.statusService.edit(this.statusz.id, status).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Sửa bài đăng thành công", duration: 3000})
      window.setTimeout(function(){location.reload()},1500)
    }, error => {
      console.log(error);
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  delete(id: any) {
    this.statusService.delete(id).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Xóa bài đăng thành công", duration: 3000})
      this.reloadCurrentRoute()
    }, e => {
      this.toast.error({detail: "Thông Báo", summary: "Sửa bài đăng thất bại", duration: 3000})
      console.log(e);
    });
  }

}
