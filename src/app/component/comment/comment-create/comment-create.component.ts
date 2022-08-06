import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from 'src/app/service/comment.service';
import {StatusService} from "../../../service/status.service";


@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  comment: any;
  commentForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    status: new FormControl(''),
    active: new FormControl(''),

  });

  constructor(private commentService: CommentService,
              private statusService: StatusService,) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.comment = {
      content: this.commentForm.value.content,
      userComment: {
        id: localStorage.getItem('ID')
      },
      status: {
        id: this.commentForm.value.status,
      },
      active: 1
    }
    this.commentService.save(this.comment).subscribe(() => {
    })
    console.log(this.comment)
  }
}


