import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage} from '../tabs/tabs'; //MM add
import { AngularFireAuth} from  "angularfire2/auth";
import { User } from '../../models/user';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user= {} as User;

  constructor( private angufireAuth:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }*/
  //MM add
  async signup(user) {
     
      //console.log('ionViewDidLoad LoginPage');
    try {
      const result= await this.angufireAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result){
        this.navCtrl.push(TabsPage, {}, { animate: true });
      }
    } catch(e){
       console.error(e);
    }
  }
    // verfication et inscription
    //this.navCtrl.push(TabsPage, {}, { animate: true });
  
}
