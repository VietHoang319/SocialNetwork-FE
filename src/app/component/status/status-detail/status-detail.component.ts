import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../model/image";
import {CommentService} from "../../../service/comment.service";
import {Comment} from "../../../model/comment";
import {RelationshipService} from "../../../service/relationship.service";

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

  constructor(private statusService: StatusService,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private relationshipService : RelationshipService,
              private router: Router) {
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
      })
      this.listImage = data[1]
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
}
