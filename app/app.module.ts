import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouteReuseStrategy
} from '@angular/router';

import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
  AppComponent
} from './app.component';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  IonicStorageModule
} from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({ _forceStatusbarPadding: true }), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    PhotoViewer,
    InAppBrowser,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}