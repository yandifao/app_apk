import { Injectable } from '@angular/core';
import {
  Storage
} from '@ionic/storage';
import Axios from 'axios';
import * as qs from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private storage: Storage,
  ) { }
  getScanBook(data) {
    return new Promise((resolve, reject) => {
      this.storage.get('storage').then(res => {
        Axios({
          url: "tes-get-data/" + res,
          method: "POST",
          data: data
        })
        .then(resp => {
          resolve(resp.data.content)
        })
        .catch(err => {
          reject(err)
        })
      })
    })
  }
  getStockByProduct(data) {
    return new Promise((resolve, reject) => {
        Axios({
          url: "#",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          method: "POST",
          data: qs.stringify({
            product: data, 
          })
        })
        .then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
