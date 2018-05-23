import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { UploadTask } from './upload-task';

@Injectable()
export class FileStorageService {

  constructor(private afso: AngularFireStorage) { }

  upload(path: string, file: File): Observable<any> {
    const fileRef = this.afso.ref(path); // Add this line to get the path as a ref
    return this.afso.upload(path, file).downloadURL();
  }

  downloadUrlProfile(uid: string): Observable<any> {
    return this.afso.ref('profile-images/' + uid).getDownloadURL();
  }

  downloadUrlWish(uid: string): Observable<any> {
    return this.afso.ref('wish-images/' + uid).getDownloadURL();
  }
}
