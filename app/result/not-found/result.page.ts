import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import {
  NavController
} from '@ionic/angular';
import {
  HelperService
} from '../../service/helper.service';
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from '@ionic-native/barcode-scanner/ngx';
import {
  ApiService
} from 'src/app/service/api.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  data: any;
  options: BarcodeScannerOptions;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  back() {
    this.navCtrl.back()
  }
  scan() {
    this.options = {
      prompt: "Arahkan ke barcode ISBN buku"
    }
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      if (barcodeData.text != "") {
        const data = {
          isbn: barcodeData.text
        }
        this.helperService.loadingPresent()
        this.apiService.getScanBook(data).then(res => {
            const response: any = res
            if (response.length > 0) {
              this.helperService.loadingDismiss()
              let param: NavigationExtras = {
                queryParams: {
                  data: JSON.stringify(response)
                }
              };
              this.router.navigate(['found'], param);
            } else {
              this.helperService.loadingDismiss()
              this.router.navigateByUrl('/not-found')
            }
          })
          .catch(() => {
            this.helperService.loadingDismiss()
            this.router.navigateByUrl('/not-found')
          })
      }
    })
  }
}