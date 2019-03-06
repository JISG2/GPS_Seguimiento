import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

declare var window;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  locations:any;
  isTracking = false


  constructor( private alert: AlertController){
    this.locations = []
   console.log("Listo para enviar tu ubicacion")

  }

  startTraking()
  {
    this.StartBackgroundTracking()
  }

  StartBackgroundTracking(){
    window.app.backgroundGeolocation.start().then(()=>
   {
     this.isTracking = true
   })
  }

  StopBackgroundGeolocation(){
    window.app.backgroundGeolocation.stop().then(()=>{
      this.isTracking = false
    })
  }

  Geolocations(){
    this.locations = (JSON.parse(localStorage.getItem("location"))== null)?[]:JSON.parse(localStorage.getItem("location"));
  }

  ClearLocations(){
    localStorage.removeItem("location");
  }

}
