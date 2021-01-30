import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';
import {
  Storage
} from '@ionic/storage';
import Axios from 'axios';
const STORAGE = 'storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);
  token: any;
  constructor(
    private storage: Storage,
  ) {}
  getToken() {
    return new Promise((resolve, reject) => {
      Axios({
          url: "tes-get-token",
          method: "POST"
        })
        .then(resp => {
          this.token = resp.data.content
          resolve(resp.data.content)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  getVersion() {
    return new Promise((resolve, reject) => {
      Axios({
          url: "isbnscanner/get-version",
          method: "GET"
        })
        .then(resp => {
          resolve(resp.data.content)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  setToken(data) {
    this.storage.set(STORAGE, data).then(() => {
      this.authenticationState.next(true);
    });
  }
}