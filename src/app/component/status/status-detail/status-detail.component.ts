import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../model/image";
import {CommentService} from "../../../service/comment.service";
import {Comment} from "../../../model/comment";
import {RelationshipService} from "../../../service/relationship.service";
import {LikeStatusService} from "../../../service/like-status.service";

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  commentId: any
  currentUserId: any
  relationship: any
  statusId: any
  status: any
  listImage: Image[] = []
  listCommentOfStatus: any[] = []
  listCommentOfComment: any[] = []
  numberOfLikeOfStatus: any
  likeStatuses: any

  constructor(private statusService: StatusService,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private relationshipService : RelationshipService,
              private router: Router, private likeStatusService : LikeStatusService) {
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.statusId = param.get("id");
      this.getStatus(this.statusId)
      this.getComment(this.statusId)
    })
  }

  getStatus(id) {
    this.statusService.getById(id).subscribe(data => {
      this.status = data[0][0]
      this.relationshipService.getRelationship(this.currentUserId, this.status.owner.id).subscribe(data => {
        this.relationship = data
        this.likeStatusService.check(this.status.id, this.currentUserId).subscribe(data => {
          this.status.isLiked = data;
        }, error => (
          console.log("err", error)
        ))
      })
      this.listImage = data[1]
      this.numberOfLikeOfStatus = data[2][0]
    }, error => {
      console.log(error)
    })
  }

  getComment(id) {
    this.commentService.getAllByStatus(id).subscribe(data => {
      for (let item of data) {
        if (item.comment == null) {
          this.listCommentOfStatus.push(item)
        }
        else {
          this.listCommentOfComment.push(item)
        }
      }
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  openChildCommentInput(index) {
    // @ts-ignore
    document.getElementsByClassName("child-comment-input")[index].style.display = "block"
  }

  delete(id) {
    this.commentService.delete(id).subscribe(() => {
      this.reloadCurrentRoute()
    }, error => {
      console.log(error)
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getCommentId(id) {
    this.commentId = id
  }

  update(index) {
    // @ts-ignore
    document.getElementsByClassName("comment-content")[index].style.display = "none"
    // @ts-ignore
    document.getElementsByClassName("comment-update")[index].style.display = "block"
  }

  childUpdate(index) {
    // @ts-ignore
    document.getElementsByClassName("child-comment-content")[index].style.display = "none"
    // @ts-ignore
    document.getElementsByClassName("child-comment-update")[index].style.display = "block"
  }

  cancel(index) {
    // @ts-ignore
    document.getElementsByClassName("comment-content")[index].style.display = "block"
    // @ts-ignore
    document.getElementsByClassName("comment-update")[index].style.display = "none"
  }

  childCancel(index) {
    // @ts-ignore
    document.getElementsByClassName("child-comment-content")[index].style.display = "block"
    // @ts-ignore
    document.getElementsByClassName("child-comment-update")[index].style.display = "none"
  }

  likeStatus(id: any) {
    this.likeStatusService.likeStatus(id, this.currentUserId).subscribe(data => {
      this.likeStatuses = data
      this.status.isLiked = !this.status.isLiked
      if (this.status.isLiked == true) {
        this.numberOfLikeOfStatus += 1
      } else {
        this.numberOfLikeOfStatus -= 1
      }
    })
  }
}
