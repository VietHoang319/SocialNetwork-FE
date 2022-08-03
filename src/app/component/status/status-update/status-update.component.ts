import {Component, OnInit} from '@angular/core';
import {Status} from "../../../model/status";
import {StatusService} from "../../../service/status.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-status-update',
  templateUrl: './status-update.component.html',
  styleUrls: ['./status-update.component.css']
})
export class StatusUpdateComponent implements OnInit {
  statusz: Status;
  id: any;

  constructor(private statusService: StatusService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = +paraMap.get('id')
    })
  }

  statusForm: FormGroup = this.fb.group({
      content: new FormControl(''),
      status: new FormControl(''),
    }
  )

  ngOnInit(): void {
    //lay gia tri
    this.activatedRoute.paramMap.subscribe(paramap => {
      const id = paramap.get('id');
      console.log(id);
      this.statusService.getById(id).subscribe(result => {
        this.statusz = result;
        console.log(result);
      }, error => {
        console.log(error);
      })
    })
    // @ts-ignore
    this.statusz = {
      content: '',
      status: ''
    }
  }

  editStatus() {
    // @ts-ignore
    const status: Status = {
      content: this.statusForm.value.content,
      status: this.statusForm.value.status,
    }
    console.log(status);
    // @ts-ignore
    // @ts-ignore
    this.statusService.edit(this.statusz.id, status).subscribe(() => {
      alert("Ok");
      this.router.navigate(['/'])
      // @ts-ignore
    }, error => {
      console.log(error);
    })
  }

}
