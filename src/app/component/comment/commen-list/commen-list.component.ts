import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../../service/comment.service";
import {StatusService} from "../../../service/status.service";
import {Status} from "../../../model/status";

@Component({
  selector: 'app-commen-list',
  templateUrl: './commen-list.component.html',
  styleUrls: ['./commen-list.component.css']
})
export class CommenListComponent implements OnInit {

  commentz: any;

  constructor(private commentService: CommentService,
              private statusService: StatusService) { }

  ngOnInit(): void {
    this.showAll();
  }
  showAll() {
    this.commentService.findAll().subscribe((comment) => {
      this.commentz = comment;
      console.log('comment', this.commentz);
    }, error => {
      console.log(error);
    })
  }
}
