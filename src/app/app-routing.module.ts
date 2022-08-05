import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./component/page/register/register.component";
import {LoginComponent} from "./component/page/login/login.component";
import {HomepageComponent} from "./component/page/homepage/homepage.component";
import {CommenListComponent} from "./component/comment/commen-list/commen-list.component";
import {CommentCreateComponent} from "./component/comment/comment-create/comment-create.component";

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
    path: "comment-list",
    component: CommenListComponent
  },
  {
    path: "comment-create",
    component: CommentCreateComponent
  },
  {
    path: "",
    component: HomepageComponent,
    loadChildren: () => import("./component/page/home-routing.module").then(module => module.HomeRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
