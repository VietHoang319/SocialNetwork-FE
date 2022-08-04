import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "../user/profile/profile.component";
import {ProfileUpdateComponent} from "../user/profile-update/profile-update.component";
import {ChangePasswordComponent} from "../user/change-password/change-password.component";
import {StatusNewFeedComponent} from "../status/status-new-feed/status-new-feed.component";

const routes: Routes = [
  {
    path: "setting-user",
    component: ProfileUpdateComponent
  },
  {
    path : "setting-password",
    component : ChangePasswordComponent
  },
  {
    path: ":id",
    component: ProfileComponent,
    loadChildren: () => import("./homepage/profile-routing.module").then(routes => routes.ProfileRoutingModule)
  },
  {
    path :"",
    component : StatusNewFeedComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
