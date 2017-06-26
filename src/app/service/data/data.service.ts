import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { IMAGE_PATH, USERS_PATH } from '../../const';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class DataService {

  rootRef; objObservable$: FirebaseListObservable<any>
  constructor(private fbDatabase: AngularFireDatabase, 
              private authService: AuthService,
              private storageService: StorageService
            ) { 
    
  }
  
  getUserImages(uid): FirebaseListObservable<any> {
    return this.fbDatabase.list(USERS_PATH+'/'+uid+'/'+IMAGE_PATH);
  }

  postDummyData() {
    this.fbDatabase.database.ref(IMAGE_PATH).set({
      name:'angel'
    })
  }

  saveUserImageInfo(imgPath) {
    const uid = this.authService.getData().uid;
    const imageRef = this.fbDatabase.database.ref(imgPath);
    const userRef = this.fbDatabase.database.ref(USERS_PATH+'/'+uid+'/images');
    this.storageService.getFileDownloadUrl(imgPath)
      .then((url) => {
          imageRef.set({
          owner:uid,
          created_at:new Date(),
          likes:0,
          url:url
        });
        
        userRef.push({
          imgUrl: url,
          created_at:new Date(),
        })
      }).catch(err => console.log(err));
 }
}
