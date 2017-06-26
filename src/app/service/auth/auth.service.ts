import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';
import { USER_DATA} from '../../const';


const providers = {
  google: firebase.auth.GoogleAuthProvider,
  facebook: firebase.auth.FacebookAuthProvider,
  github: firebase.auth.GithubAuthProvider
}

@Injectable()
export class AuthService {

  public auth$: Observable<boolean>;
  private isAuth:boolean = false;
  public redirectUrl;

  constructor(private fbAuth: AngularFireAuth) { 
     this.auth$ = this.fbAuth.authState
        .do(this.saveUserData)
        .map(this.authSubcription);

  }

  private authSubcription(user) {
    return user !== null ? true : false;
  }

  userToJson(user) {
    return user.toJSON()
  }

  isAuthenticated() :boolean {
    return this.fbAuth.auth.currentUser !== null;
  }

  loginWith(provider: string): Promise<boolean> {

    let authProvider = providers[provider];

    let self = this;
      return new Promise((resolve, reject) => {
          this.fbAuth.auth.signInWithPopup(new authProvider()).then((result) => {
            if(result) {
              self.saveUserData(result.user);
              resolve(true);
            } else {
              resolve(false);
            }
          }).catch((err) => reject(new Error(err.message)))
      })
  }

  getRedirectResult() {
     return this.fbAuth.auth.getRedirectResult().then((result) => {
        if(result) {
          this.saveUserData(result.user);
          return true;
        } else return false
    })
  }

  login(email, password):any {
    let self = this;
    return new Promise((resolve, reject) => {
      this.fbAuth.auth.signInWithEmailAndPassword(email,password).then((result) =>{
        self.saveUserData(result.user);
        resolve(true);
      }).catch((err) =>{
        reject(err);
      })
    })
  }

  register(email, password) {
    this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then()
      .catch();
  }

  registerWith(provider: string) {
    return this.loginWith(provider);
  }

  logout() {
    this.deleteUserData();
    return this.fbAuth.auth.signOut().then(() => true).catch((e) => false);
  }

  deleteUserData() {
    this.isAuth = false;
    window.localStorage.removeItem(USER_DATA);
  }

  saveUserData(userData) {
    userData !== null ? this.isAuth = true : this.isAuth = false;
    window.localStorage.setItem(USER_DATA,JSON.stringify(userData));
  }

  getData() {
    return JSON.parse(window.localStorage.getItem(USER_DATA));
  }

}
