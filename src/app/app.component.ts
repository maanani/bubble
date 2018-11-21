import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { NetworkserviceProvider } from '../providers/networkservice/networkservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = WelcomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public networkService: NetworkserviceProvider,
    public toast: ToastController, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.initializeApp();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  initializeApp(): void {

    this.networkService.initializeNetworkEvents();

    this.networkService.getNetworkStatus().subscribe(data => {
      console.log('platform ready', data);
      this.toast.create({
        message: data? 'No connection':' connection ' + this.networkService.getNetworkType(),
        duration: 3000,
      }).present();;
    });
  }
}
