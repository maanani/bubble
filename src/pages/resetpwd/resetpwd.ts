import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {User} from '../../models/user';
import { AngularFireAuth} from  "angularfire2/auth";
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { LoginPage } from '../login/login';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


/**
 * Generated class for the ResetpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html',
})
export class ResetpwdPage {
  resetForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private angufireAuth:AngularFireAuth, private alertCtrl: AlertController,private formBuilder: FormBuilder,public ga: GoogleAnalytics ) {
this.googleAnalytics();
    this.resetForm = this.formBuilder.group({

      email: [
        '', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required
        ])
      ]
  
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpwdPage');
  }

  async verifEmailExist(email){
  let emailOK= false;
      const result= await this.angufireAuth.auth.signInWithEmailAndPassword(email, "azerty").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          console.log("the error code"+errorCode);
          //alert('invalid mail');
          emailOK= false;
        } else {
          emailOK= true;
        }
        console.log(error);
      });
      console.log(emailOK);
    return emailOK;
  }

  //reset Password method

  resetPassword () {
    try {
    
    let email=this.resetForm.controls['email'].value;
    //  before check if email existe
    this.verifEmailExist(email).then((res)=> {if(res){ console.log("this is res"+res);
      this.angufireAuth.auth.sendPasswordResetEmail(email).then (() => this.presentConfirm(email,res));
      
    }else {this.presentConfirm(email,res);}});
    
    
     /// this.angufireAuth.auth.sendPasswordResetEmail(email).then (() => this.presentConfirm(email));
      //add massage email has been sent
    } catch(e){
       console.error(e);
    }
    
  }
  presentConfirm(email:string, emailOK: boolean) {
    let alert = this.alertCtrl.create({
      title: emailOK? ' initialisation de mot de pass ':'Attention' ,
      message: emailOK?'Un mail a été envoyé au :' + email: 'Veuillez vérifier votre adresse mail: '+email ,
      buttons: [
       
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push(LoginPage, {}, { animate: true })
                   //console.log('call clicked' + agence.telephone);
          }
        }
      ]
    });
    alert.present();
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('resetpass');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}
