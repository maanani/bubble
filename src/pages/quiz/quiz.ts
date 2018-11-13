import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizProvider} from '../../providers/quiz/quiz';
import { Quiz } from '../../models/quiz';


/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  public quiz={} as Quiz ;
  idContent=1;
  response:string;
 
  mutiresponse:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public quizProvider : QuizProvider) {
    //this.quiz=this.quizProvider.getQuiz(1);
  }

  ionViewDidLoad() {
    // mettre la velur du contenu recupérer du httpparam
    console.log('ionViewDidLoad QuizPage');
   this.quizProvider.getallQuiz().subscribe (res=> {
   this.quiz= res.find((quiz) => { return quiz.idContent == this.idContent });
    // this.quiz.question="my question?"

   console.log ( 'the question is :'+this.quiz.question);
   //this.quiz.responses.Rep1.answer="blablbla"
   console.log( 'Rep1:'+ this.quiz.responses[0].answer);
   console.log('ionViewDidLoad QuizPage:'+JSON.stringify(this.quiz)); });
    //to complete
  }
  verify(response :string){
    this.response=response;

    console.log("response is"+this.response);

  }
}
