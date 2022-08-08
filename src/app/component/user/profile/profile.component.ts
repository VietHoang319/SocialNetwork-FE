import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RelationshipService} from "../../../service/relationship.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: any
  user: any
  currentId: any
  relationship: any
  userId1: any
  userForm: FormGroup = new FormGroup({
    avatar: new FormControl(),
  })
  constructor(private userService: UserService,
              private relationshipService: RelationshipService,
              private activatedRoute: ActivatedRoute,private toast : NgToastService,private storage: AngularFireStorage,private router: Router) {
  }

  ngOnInit(): void {
    this.userId1 = localStorage.getItem("ID")
    this.currentId = localStorage.getItem("ID")
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.userService.getUserProfile(this.id).subscribe(data => {
        this.user = data
        this.getRelationship(this.userId1, this.id)
      })
    })
  }

  getRelationship(user1, user2) {
    this.relationshipService.getRelationship(user1, user2).subscribe(data => {
      this.relationship = data
    })
  }

  addFriend() {
    const relationship = {
      user1: {
        id: localStorage.getItem("ID")
      },
      user2: {
        id: this.id
      },
    }
    console.log(relationship)
    this.relationshipService.addFiend(relationship).subscribe(data => {
      this.relationship = data;
    })
  }

  deleteRelationship() {
    this.relationshipService.deleteRelationship(this.relationship.id).subscribe(id => {
      this.relationship = null;
    })
  }

  friendConfirmation() {
    this.relationshipService.friendConfirmation(this.relationship.id).subscribe(data => {
      this.relationship.status=2
    })
  }

  updateAvatar(id : any){
    this.userForm.value.avatar = this.fb;
    const user = this.userForm.value;
    console.log(user)
    this.userService.updateAvatar(id,user).subscribe( () =>{
      this.toast.success({detail: "Thông Báo", summary: "Sửa ảnh đại diện thành công", duration: 3000})
      localStorage.setItem("AVATAR",this.fb);
      window.setTimeout(function(){location.reload()},1500)
    })
  }

  fb: any
  downloadURL: any;
  onFileSelected(event: any) {
    this.fb = ""
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `cloud/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`cloud/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.updateAvatar(this.currentId)
          });
        })
      )
      .subscribe((url: any) => {
        if (url) {
          console.log(url);
        }
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
