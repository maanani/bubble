import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Quiz} from '../../models/quiz';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.answeredCorrect=this.navParams.get('answeredCorrect');
    this.quiz=this.navParams.get('quiz');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage, You ansewer is '+ this.answeredCorrect);
    console.log('ionViewDidLoad ResultPage: '+ this.quiz.question+ 'and Type is '+this.quiz.type);
  }
  nextCourse(){
    console.log('Fin ResultPage, go next');
  }
  }