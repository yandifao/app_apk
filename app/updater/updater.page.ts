import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updater',
  templateUrl: './updater.page.html',
  styleUrls: ['./updater.page.scss'],
})
export class UpdaterPage implements OnInit {
  data: any;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
      }
    });
  }

  update(){
    if(this.data.url.indexOf('http://') > -1 || this.data.url.indexOf('https://') > -1) {
      window.location.href = this.data.url 
    } else {
      window.location.href = "http://" + this.data.url
    }
  }
}
