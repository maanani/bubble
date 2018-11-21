import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage} from '../tabs/tabs'; //MM add
import { AngularFireAuth} from  "angularfire2/auth";
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
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
  signupForm: FormGroup;
  constructor( private angufireAuth:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController ,public formBuilder:FormBuilder) {
    this.signupForm = this.formBuilder.group({

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
      ],
      confirmpassword: [
        '', Validators.compose([
          Validators.pattern(regexValidators.password),
          Validators.required
        ])
      ]
    }, {validator: SignupPage.passwordsMatch});
  }
  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('password');
    let pwd2 = cg.get('confirmpassword');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }*/
  //MM add
  async signup() {

    if (this.signupForm.valid) {
    this.user.email= this.signupForm.controls['email'].value; 
    this.user.password=this.signupForm.controls['password'].value; 
      //console.log('ionViewDidLoad LoginPage');
    try {


      const result= await this.angufireAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.user.email, this.user.password).catch(function(error) {
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
     
    
      console.log(result);
      if (result){
        this.navCtrl.push(TabsPage, {}, { animate: true });
      }
      else{this.presentConfirm();}
    } catch(e){
      
       console.error(e);
    }
  }
}
presentConfirm() {
  let alert = this.alertCtrl.create({
    title:  ' Attention ',
    message: 'Veuillez chosir un autre email/mot de passe',
    buttons: [
     
      {
        text: 'OK',
        handler: () => {
          this.navCtrl.push(SignupPage, {}, { animate: true })
                 //console.log('call clicked' + agence.telephone);
        }
      }
    ]
  });
  alert.present();
}
    // verfication et inscription
    //this.navCtrl.push(TabsPage, {}, { animate: true });
  
}
