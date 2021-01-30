import {
  Component
} from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from '@ionic-native/barcode-scanner/ngx';
import {
  ApiService
} from '../service/api.service';
import {
  HelperService
} from '../service/helper.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  options: BarcodeScannerOptions;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router,
  ) {}
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
          })
      }
    })
  }
  search() {
    this.helperService.createBrowser("https://www.grobmart.com/")
  }
  history() {
    this.helperService.createBrowser("https://www.grobmart.com/my-order")
  }
}