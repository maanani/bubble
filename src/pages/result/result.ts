import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import{Quiz} from '../../models/quiz';
import { SettingPage } from '../setting/setting';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  public quiz = {} as Quiz;
  answeredCorrect: boolean;

  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams, private modalCtrl: ModalController,public ga:GoogleAnalytics) {
    this.googleAnalytics();
    
    this.answeredCorrect=this.navParams.get('answeredCorrect');
    
    this.quiz=this.navParams.get('quiz');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage, You ansewer is '+ this.answeredCorrect);
    console.log('ionViewDidLoad ResultPage: '+ this.quiz.question+ 'and Type is '+this.quiz.type);
  }
  nextCourse(){
    
    console.log('Fin ResultPage, go next');
    //this.navCtrl.pop();
    this.viewCtrl.dismiss();
  
  }
  openModal(){

    this.navCtrl.push(SettingPage,{});
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('resultquiz');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
  }