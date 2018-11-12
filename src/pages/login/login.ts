import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user';
import { AngularFireAuth} from  "angularfire2/auth";
import { TabsPage } from '../tabs/tabs';

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
  user= {} as User;
  constructor( private angufireAuth:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  } 

  async login(user) {
    //console.log('ionViewDidLoad LoginPage');
  try {
    console.log (user.password);
    const result= await this.angufireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    console.log(result);
    if ( result){
      
      this.navCtrl.push(TabsPage, {}, { animate: true });
    //const rootPage = this.app.getRootNav();
    //rootPage.popToRoot();
    }
  
  } catch(e){
     console.error(e);
  }

  /*
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
*/
}
async loginwithfc(user){
  try {
    console.log (user.password);
    const result= await this.angufireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    console.log(result);
    if ( result){
      
      this.navCtrl.push(TabsPage, {}, { animate: true });
    //const rootPage = this.app.getRootNav();
    //rootPage.popToRoot();
    }
  
  } catch(e){
     console.error(e);
  }
}

}
