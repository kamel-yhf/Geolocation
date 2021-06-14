import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  coords: any;
  address: any;
  destAdd = "Paris, FR"
  constructor(private nativeGeocoder: NativeGeocoder, private launchNavigator: LaunchNavigator) { }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    this.coords = coordinates.coords;
    console.log(this.coords.latitude.toString() + ', ' + this.coords.longitude.toString());
    
  }

  async reverseGeocode() {
    if (!this.coords) {
      const coordinates = await Geolocation.getCurrentPosition();
      this.coords = coordinates.coords;
    }
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    this.nativeGeocoder
      .reverseGeocode(this.coords.latitude, this.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = result[0];
        console.log(result);
      })
      .catch((error: any) => console.log(error));
  }

  
  naveMe(address){
    this.launchNavigator.navigate(this.destAdd, {
      start: address
  });
  }

}
