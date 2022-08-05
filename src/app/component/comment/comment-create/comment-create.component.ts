import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../service/comment.service";
import {StatusService} from "../../../service/status.service";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  commentz: any;
  commentForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    active: new FormControl(''),

  });
  constructor(private commentService: CommentService,
              private statusService: StatusService) { }

  ngOnInit(): void {
  }
  submit() {
    this.commentz = {
      content: this.commentForm.value.content,
      userComment:{
        id: localStorage.getItem('ID')
      },
      active: this.commentForm.value.active
    }
  }

}
