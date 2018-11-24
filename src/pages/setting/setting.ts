import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,App, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Home3Page } from '../home3/home3';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  //@ViewChild(Nav) nav: Nav;



  connected: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController, private angufireAuth:AngularFireAuth, public app :App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
logout(){
  let alert = this.alertCtrl.create({
    title: 'Deconnexion ',
    message: 'Etes vous sûr de voiloir se déconnecter?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmer',
        handler: () => {
          
          this.angufireAuth.auth.signOut().then((res)=>{ 
           // const root=this.nav.root
           console.log('useris :'+ this.angufireAuth.auth.currentUser)
           this.app.getRootNav().setRoot(WelcomePage);

          });
         // this.navCtrl.pop();
          
                 //console.log('call clicked' + agence.telephone);
        }
      }
    ]
  });
  alert.present();
  
}
}
