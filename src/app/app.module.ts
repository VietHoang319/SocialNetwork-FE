import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './component/page/register/register.component';
import { LoginComponent } from './component/page/login/login.component';
import {NavbarComponent} from "./component/block/navbar/navbar.component";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";


@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        NavbarComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
