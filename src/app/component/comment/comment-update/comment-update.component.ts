import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../../service/comment.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {
  comment: any;
  @Input()
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
    this.commentService.getById(this.id).subscribe(result => {
      // @ts-ignore
      this.comment = result;
    }, error => {
      console.log(error);
    })
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
      this.reloadCurrentRoute()
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
}
