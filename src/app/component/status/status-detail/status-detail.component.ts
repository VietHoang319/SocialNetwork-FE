import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../model/image";
import {CommentService} from "../../../service/comment.service";
import {Comment} from "../../../model/comment";

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  statusId: any
  status: any
  listImage: Image[] = []
  listCommentOfStatus: any[] = []
  listCommentOfComment: any[] = []

  constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute, private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.statusId = param.get("id");
      this.getStatus(this.statusId)
      this.getComment(this.statusId)
    })
  }

  getStatus(id) {
    this.statusService.getById(id).subscribe(data => {
      this.status = data[0][0]
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
}
