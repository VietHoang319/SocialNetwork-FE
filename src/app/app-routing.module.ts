import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./component/page/register/register.component";
import {LoginComponent} from "./component/page/login/login.component";
import {StatusListComponent} from "./component/status/status-list/status-list.component";
import {StatusCreateComponent} from "./component/status/status-create/status-create.component";


const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  }, {
    path: "login",
    component: LoginComponent
  },{
  path: "list",
    component: StatusListComponent
  },{
    path: "",
    component: StatusCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
