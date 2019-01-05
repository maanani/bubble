import { Component } from '@angular/core';
import { IonicPage, NavController,App } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the LogoutPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {



  constructor(public navCtrl: NavController, public app: App,public ga:GoogleAnalytics) { this.googleAnalytics()}

  logout() {
    const rootPage = this.app.getRootNav();
    rootPage.popToRoot();
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('logout');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}
