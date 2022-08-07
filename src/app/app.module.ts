import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './component/page/register/register.component';
import {LoginComponent} from './component/page/login/login.component';
import {NavbarComponent} from "./component/block/navbar/navbar.component";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { ProfileComponent } from './component/user/profile/profile.component';
import { HomepageComponent } from './component/page/homepage/homepage.component';
import {ProfileUpdateComponent} from './component/user/profile-update/profile-update.component';
import { StatusCreateComponent } from './component/status/status-create/status-create.component';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component';
import { PostsComponent } from './component/user/posts/posts.component';
import {NgToastModule} from "ng-angular-popup";
import { StatusUpdateComponent } from './component/status/status-update/status-update.component';
import { StatusListComponent } from './component/block/status-list/status-list.component';
import {StatusOwnerListComponent} from "./component/status/status-owner-list/status-owner-list.component";
import { RelationshipComponent } from './component/user/relationship/relationship.component';
import { ListFriendComponent } from './component/block/list-friend/list-friend.component';
import { StatusNewFeedComponent } from './component/status/status-new-feed/status-new-feed.component';
import { CommentCreateComponent } from './component/comment/comment-create/comment-create.component';
import { StatusDetailComponent } from './component/status/status-detail/status-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    HomepageComponent,
    ProfileUpdateComponent,
    StatusCreateComponent,
    ChangePasswordComponent,
    PostsComponent,
    StatusUpdateComponent,
    CommentCreateComponent,
    RelationshipComponent,
    ListFriendComponent,
    StatusListComponent,
    StatusOwnerListComponent,
    StatusNewFeedComponent,
    StatusDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
