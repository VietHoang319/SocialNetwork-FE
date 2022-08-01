import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StatusService} from "../../../service/status.service";
import {Status} from "../../../model/status";
import {User} from "../../../model/user";
import {allowMangle} from "@angular-devkit/build-angular/src/utils/environment-options";

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit {
  statuz: any;
  statusForm: FormGroup = new FormGroup({
    content: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(private statusService: StatusService) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.statuz = {
      content: this.statusForm.value.content,
      status: this.statusForm.value.status,
      owner: {
        id: localStorage.getItem('ID'),
      }
    }
    if (this.statuz.content == "") {
    } else {
      if (this.statuz.status == 0) {
        this.statuz.status = 1
      }
      this.statusService.save(this.statuz).subscribe((data) => {
        this.statusForm.reset();
      }, error => {
      });
    }
  }
}
