import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {Status} from "../../../model/status";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-status-delete',
  templateUrl: './status-delete.component.html',
  styleUrls: ['./status-delete.component.css']
})
export class StatusDeleteComponent implements OnInit {


  constructor() {
  }


  ngOnInit(): void {
  }

}
