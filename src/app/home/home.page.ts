import { Component } from '@angular/core';

declare var window;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  locations:any;

  constructor(){
    this.locations = [];

  }

  StartBackgroundTracking(){
    window.app.backgorundGeolocation.start();
  }

  StopBackgroundGeolocation(){
    window.app.backgorundGeolocation.stop();
  }

  Geolocations(){
    this.locations = (JSON.parse(localStorage.getItem("location"))== null)?[]:JSON.parse(localStorage.getItem("location"));
  }

  ClearLocations(){
    localStorage.removeItem("location");
  }

}
