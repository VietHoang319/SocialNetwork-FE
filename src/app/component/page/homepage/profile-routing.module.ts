import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostsComponent} from "../../user/posts/posts.component";
import {RelationshipComponent} from "../../user/relationship/relationship.component";

const routes: Routes = [
  {
    path: "list-friend",
    component: RelationshipComponent
  },
  {
    path: "",
    component: PostsComponent
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
