import {
  Injectable
} from '@angular/core';
import {
  LoadingController,
  ToastController
} from '@ionic/angular';
import {
  InAppBrowser,
  InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  isLoading: Boolean = false
  options: InAppBrowserOptions = {
    location: 'yes', //Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes', //Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no', //iOS only 
    presentationstyle: 'pagesheet', //iOS only 
    fullscreen: 'yes', //Windows only    
  };
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private InAppBrowser: InAppBrowser
  ) {}

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: "Harap tunggu..."
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async toastPresent(msg, type) {
    const toast = await this.toastController.create({
      message: msg,
      color: type,
      duration: 5000,
      buttons: [{
        text: 'Tutup',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    toast.present();
  }
  async createBrowser(url) {
    let target = "_blank";
    this.InAppBrowser.create(url, target, this.options);
  }
}