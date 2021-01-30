import {
  Component
} from '@angular/core';

import {
  Platform
} from '@ionic/angular';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import Axios from 'axios'
import {
  SERVER_URL
} from '../environments/environment'
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  AuthService
} from './service/auth.service';
import {
  Storage
} from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HelperService } from './service/helper.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  token: any = {}
  response: any = {}
  counter:number = 0
  constructor(
    private platform: Platform,
    private router: Router,
    private splashscreen: SplashScreen,
    private authenticationService: AuthService,
    private storage: Storage,
    private statusBar: StatusBar,
    private helperService: HelperService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#33000000");
      }
      this.splashscreen.hide();
      Axios.defaults.baseURL = SERVER_URL
      Axios.defaults.headers.post["Content-Type"] = "application/json";
      await this.storage.get('storage').then(async (ress) => {
        await this.authenticationService.getVersion().then(async res => {
            const response:any = res
            if(response.version == "0.1"){
                if (!ress) {
                    await this.authenticationService.getToken().then(async res => {
                      await this.authenticationService.setToken(res)
                    })
                }
                this.router.navigateByUrl('/home');
            }else{
                let param: NavigationExtras = {
                    queryParams: {
                      data: JSON.stringify(response)
                    }
                };
                this.router.navigate(['updater'], param);
            }
        })
        .catch(err=>{
            console.log(err)
        });
      })
      .catch(err => {
        alert(err)
      });
    })
    .catch(err => {
      alert(err)
    });

    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home', true) && this.router.url === '/home') {
        if (this.counter == 0) {
          await this.counter++;
          this.helperService.toastPresent("Tekan sekali lagi untuk keluar aplikasi","danger");
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          navigator['app'].exitApp();
        }
      }
    });
  }
}