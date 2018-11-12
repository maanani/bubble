import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizProvider} from '../../providers/quiz/quiz';


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
  public quiz;
  idContent=2;
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

  
    console.log('ionViewDidLoad QuizPage:'+JSON.stringify(this.quiz)); });
    //to complete
  }
  verify(response :string){
    this.response=response;

    console.log("response is"+this.response);

  }
}
