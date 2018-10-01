import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController, public app: App) { }

  login() {
    console.log('ionViewDidLoad LoginPage');
    const rootPage = this.app.getRootNav();
    rootPage.popToRoot();
  }
  /*
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
*/
}
