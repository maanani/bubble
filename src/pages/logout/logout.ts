import { Component } from '@angular/core';
import { IonicPage, NavController,App } from 'ionic-angular';

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



  constructor(public navCtrl: NavController, public app: App) { }

  logout() {
    const rootPage = this.app.getRootNav();
    rootPage.popToRoot();
  }

}
