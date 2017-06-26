import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListDetailComponent } from './list/list-detail/list-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment } from './environment';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth/auth.guard';
import { LoginGuard } from './service/auth/login.guard';
import { AuthService } from './service/auth/auth.service';
import { DataService } from './service/data/data.service';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] }
]


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDetailComponent,
    WelcomeComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthGuard, AuthService, LoginGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
