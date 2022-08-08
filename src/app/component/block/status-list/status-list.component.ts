import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../../model/status";
import {ActivatedRoute, Router} from "@angular/router";
import {StatusService} from "../../../service/status.service";
import {Role} from "../../../model/role";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {
  @Input()
  statuses: any;
  @Input()
  currentID: any;
  @Input()
  id: any
  @Input()
  img : any
  @Input()
  relationship: any
  @Input()
  statuz : any;
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

  statusForm: FormGroup = this.fb.group({
      content: new FormControl(''),
      status: new FormControl(''),
    }
  )

  constructor(private statusService: StatusService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  getStatus(id) {
    this.statusService.getById(id).subscribe(result => {
      this.statusz = result[0][0];
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
