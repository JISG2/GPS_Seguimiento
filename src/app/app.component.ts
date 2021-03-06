import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {BackgroundGeolocation,BackgroundGeolocationConfig,BackgroundGeolocationResponse,BackgroundGeolocationEvents} from '@ionic-native/background-geolocation/ngx'

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  arr: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundGeolocation: BackgroundGeolocation,
    private alert: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      const config: BackgroundGeolocationConfig={
        desiredAccuracy:10,
        stationaryRadius:20,
        distanceFilter:30,
        debug: true,
        stopOnTerminate:false,

      };
      this.backgroundGeolocation.configure(config).then(()=>{
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe(
          (location:BackgroundGeolocationResponse)=>{
            // var locationstr = localStorage.getItem('location');
            // if(locationstr == null){
            //   this.arr.push(location);
            // }
            // else{
            //   var locationarr = JSON.parse(locationstr)
            // }
            // localStorage.setItem("location",JSON.stringify(this.arr));
              //console.log(location)
              this.showAlert(location)
              window.position = location
          })
      })
      window.app = this;
    });
  }

  async showAlert(m:any)
    {
     let alert = await this.alert.create({
       header: "Tracker",
       message: m,
       buttons: ['Ok']
     });
     await alert.present();
    }
}
