import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./component/page/register/register.component";
import {LoginComponent} from "./component/page/login/login.component";
import {HomepageComponent} from "./component/page/homepage/homepage.component";
import {ProfileUpdateComponent} from "./component/user/profile-update/profile-update.component";
import {StatusListComponent} from "./component/status/status-list/status-list.component";
import {StatusCreateComponent} from "./component/status/status-create/status-create.component";
import {ChangePasswordComponent} from "./component/user/change-password/change-password.component";
import {StatusUpdateComponent} from "./component/status/status-update/status-update.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "setting-user",
    component: ProfileUpdateComponent
  },
  // {
  //   path: "",
  //   component: HomepageComponent
  // },
  {
    path: "",
    component: StatusListComponent
  },
  {
    path: "status-create",
    component: StatusCreateComponent
  },
  {
    path: "edit/:id",
    component: StatusUpdateComponent
  },
  {
    path: ":id",
    component: HomepageComponent
  },
  {
    path : "setting-password",
    component : ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
