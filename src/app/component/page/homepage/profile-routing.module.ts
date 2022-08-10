import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostsComponent} from "../../user/posts/posts.component";
import {RelationshipComponent} from "../../user/relationship/relationship.component";
import {ImageComponent} from "../../image/image.component";
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: "list-friend",
    canActivate: [AuthGuard],
    component: RelationshipComponent
  },
  {
    path: "list-image",
    canActivate: [AuthGuard],
    component: ImageComponent
  },
  {
    path: "",
    canActivate: [AuthGuard],
    component: PostsComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule { }
