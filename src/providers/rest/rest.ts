import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://mail.wingchit.com.hk/wcapps/so.nsf/JSONSO?ReadViewEntries&outputformat=JSON&count=1000';
  constructor(public http: HttpClient,public loadingCtrl: LoadingController) {
    console.log('Hello RestProvider Provider');
  } 

  getUsers() {
    let loading = this.loadingCtrl.create({
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`
    });
    loading.present();
    return new Promise(resolve => {
      this.http.get(this.apiUrl, {observe: 'response'} ).subscribe(resp  => { 
        // Here, resp is of type HttpResponse<MyJsonData>.
        // You can inspect its headers:
        loading.dismiss();
        console.log(resp.headers.get('Last-Modified'));
        resolve(resp.body);
        // And access the body directly, which is typed as MyJsonData as requested.
      }, err => {
        console.log(err);
      });
    });
  }
  saveImage(data){
    let loading = this.loadingCtrl.create({
      content: '正在上传....'
    });
    loading.present();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://mail.wingchit.com.hk/wcapps/photo.nsf/rest.xsp/upload', JSON.stringify(data),httpOptions)
        .subscribe(res => {
          loading.dismiss();
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
