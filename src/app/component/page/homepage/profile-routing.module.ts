import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostsComponent} from "../../user/posts/posts.component";
import {StatusUpdateComponent} from "../../status/status-update/status-update.component";

const routes: Routes = [
  {
    path: "",
    component: PostsComponent
  },
  {
    path: "status/:id",
    component : StatusUpdateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule { }
