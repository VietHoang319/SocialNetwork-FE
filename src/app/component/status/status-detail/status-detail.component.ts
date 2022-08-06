import {Component, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../model/image";

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  statusId: any
  status: any
  listImage: Image[] = []
  constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.statusId = param.get("id");
      this.getStatus(this.statusId)
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
}
