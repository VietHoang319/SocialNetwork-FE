import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../../service/comment.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {
  comments: any;
  id: any;
  constructor(private commentService: CommentService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = +paraMap.get('id')
    })
  }

  commentForm: FormGroup = this.fb.group({
      active: new FormControl(''),
      content: new FormControl('')
    }
  )

  ngOnInit(): void {
    //lay gia tri
    this.activatedRoute.paramMap.subscribe(paramap => {
      const id = paramap.get('id');
      console.log(id);
      this.commentService.getById(id).subscribe(result => {
        // @ts-ignore
        this.comments = result;
        console.log(result);
      }, error => {
        console.log(error);
      })
    })

    this.comments = {
      // @ts-ignore
      active: '',
      content: ''
    }
  }

  editComment() {
    const comment: Comment = {
      // @ts-ignore
      active: this.commentForm.value.active,
      content: this.commentForm.value.content,
    }
    console.log(comment);
    // @ts-ignore

    this.commentService.edit(this.id, comment).subscribe((data) => {
      alert("Ok");
      this.router.navigate(['/'])
      // @ts-ignore
    }, error => {
      console.log(error);
    })
  }

}
