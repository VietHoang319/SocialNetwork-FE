import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileUpdateComponent} from "./component/user/profile-update/profile-update.component";

const routes: Routes = [
  {
    path : "user/profile/:id",
    component : ProfileUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
