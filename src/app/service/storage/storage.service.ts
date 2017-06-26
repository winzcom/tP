import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageService {

  imageRef;
  constructor() { 
    this.imageRef = firebase.storage().ref().child('images');
  }

  uploadFile(file) {
    
  }

  getFileDownloadUrl(path) {
    return new Promise((resolve, reject) => {
      this.imageRef.child(path).getDownloadUrl()
        .then((url) => resolve(url))
        .catch(err => reject(err));
    })
  }

}
