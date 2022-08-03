import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../../model/status";
import {Router} from "@angular/router";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {
  @Input()
  statuses : any;
  @Input()
  currentID : any;
  @Input()
  id : any
  constructor() { }

  ngOnInit(): void {
  }

}
