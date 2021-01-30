import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NavController
} from '@ionic/angular';
import {
  HelperService
} from '../../service/helper.service';
import { ApiService } from 'src/app/service/api.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  data: any;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private helperService: HelperService,
    private apiService: ApiService,
    private photoViewer: PhotoViewer
  ) {}

  ngOnInit() {
    this.getData()
  }

  loadData(event) {
    const current = this
    setTimeout(() => {
      event.target.complete();
      current.getData()
      if (current.data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  getData() {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
        this.data.map(x => {
          this.getStockByProduct(x.product_id)
        })
      }
    });
  }
  async getStockByProduct(id) {
    this.apiService.getStockByProduct(id).then(res => {
      const response: any = res
      const status = response.hasil > 0 ? "Tersedia" : "Gudang Penerbit"
      const class_status = response.hasil > 0 ? "stocking-primary" : "stocking-warning"
      document.getElementById(response.id).innerHTML = status
      document.getElementById(response.id).setAttribute("class", class_status)
    })
  }
  back() {
    this.navCtrl.navigateBack('/home');
  }
  beli(keyword,id) {
  console.log(keyword)
	if(keyword){
		this.helperService.createBrowser("https://www.grobmart.com/" + keyword)
	} else {
		this.helperService.createBrowser("https://www.grobmart.com/index.php?route=product/product&product_id=" + id)
	}
  }
  parseImage(item) {
    var data;
    if (item) {
      data = {
        backgroundImage: 'url(https://www.grobmart.com/image/'+ item +
          ')',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }
    } else {
      data = {
        background: 'rgb(195, 195, 195) !important',
      }
    }
    return data
  }
  formatRupiah(angka, prefix) {
    let number_string = parseInt(angka).toString().replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }
  openImage(image) {
    this.photoViewer.show(image)
  }
}