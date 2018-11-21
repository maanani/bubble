import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {User} from '../../models/user';
import { AngularFireAuth} from  "angularfire2/auth";
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import {ResetpwdPage} from '../resetpwd/resetpwd';


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
  loginForm: FormGroup;
  constructor( private angufireAuth:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({

      email: [
        '', Validators.compose([
          Validators.pattern(regexValidators.email),
          Validators.required
        ])
      ],
      password: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ]
    });
  }
  

  async login() {
    //console.log('ionViewDidLoad LoginPage');
   
  if (this.loginForm.valid) {
    this.user.email= this.loginForm.controls['email'].value; 
    this.user.password=this.loginForm.controls['password'].value; 
  try {
    console.log (this.user.password);
    const result= await this.angufireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      //var errorMessage = error.message;
      if (errorCode) {
        console.log("the error code:"+errorCode);
        //alert('invalid mail');
      return false;
      } else {
        
      console.log(error);
    }});
    console.log("resultis: "+result);
    if ( result){
      
      this.navCtrl.push(TabsPage, {}, { animate: true });
    //const rootPage = this.app.getRootNav();
    //rootPage.popToRoot();
    }else {this.presentConfirm()}

  } catch(e){
     console.error(e);
  }
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
    const result= await this.angufireAuth.auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      //var errorMessage = error.message;
      if (errorCode) {
        console.log("the error code:"+errorCode);
        //alert('invalid mail');
      return false;
      } else {
        
      console.log(error);
    }});
    console.log("resultis: "+result);
    if ( result){
      
      this.navCtrl.push(TabsPage, {}, { animate: true });
    //const rootPage = this.app.getRootNav();
    //rootPage.popToRoot();
    }else {this.presentConfirm()}

  } catch(e){
     console.error(e);
  }
}
presentConfirm() {
  let alert = this.alertCtrl.create({
    title:  ' Attention ',
    message: 'Veuillez vérifier votre email/mot de passe',
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
resetPwd(){

  this.navCtrl.push(ResetpwdPage,{email:this.loginForm.controls['email'].value},{ animate: true });
}
}
