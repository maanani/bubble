import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizProvider } from '../../providers/quiz/quiz';
import { Quiz } from '../../models/quiz';
import { ResultPage } from '../result/result';
import { isTrueProperty } from 'ionic-angular/umd/util/util';


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
  public quiz = {} as Quiz;
  answeredCorrect: boolean;
  idContent = 1;
  response: {
    id: string;
    answer: string;
    iscorrect: boolean;
  };

  multiresponse: Array<any> = new Array<any>();
  falsecheked: boolean;
  falsechecked= 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public quizProvider: QuizProvider) {
    //this.quiz=this.quizProvider.getQuiz(1);
  }

  ionViewDidLoad() {
    this.answeredCorrect = false;
    // mettre la velur du contenu recupérer du httpparam
    this.idContent = this.navParams.get('idCourse');
    console.log('ionViewDidLoad QuizPage');
    this.quizProvider.getallQuiz().subscribe(res => {
      this.quiz = res.find((quiz) => { return quiz.idContent == this.idContent });
      // this.quiz.question="my question?"

      console.log('the question is :' + this.quiz.question);
      //this.quiz.responses.Rep1.answer="blablbla"
      console.log('Rep1:' + this.quiz.responses[0].answer);
      console.log('ionViewDidLoad QuizPage:' + JSON.stringify(this.quiz));
    });
    //to complete
  }
  ionViewDidEnter() {
    this.answeredCorrect = false;
  }
  select(response) {
    this.response = response;
    console.log(" this response is" + this.response.id);
  }
  verify() {

    console.log(" this response is" + this.response.id + " is " + this.response.iscorrect);
    if (this.response.iscorrect) {
      this.answeredCorrect = true;
    };
    this.navCtrl.push(ResultPage, { answeredCorrect: this.answeredCorrect, quiz: this.quiz });
  }
  addselect(resp) {
    console.log('you selected rep:' + resp.answer + 'and it is ' + resp.iscorrect);


    if (resp.checked == true && resp.iscorrect == true) {
      console.log('adding :' + resp + 'because checked is ' + resp.checked);
      this.multiresponse.push(resp);
      console.log("ajouter de la liste :" + this.multiresponse.length);
    } else {
      const respId = this.multiresponse.findIndex((res) => {
        return (res.id === resp.id)
      });

      if (resp.checked == true && resp.iscorrect == false) {
        this.falsechecked = this.falsechecked + 1;
        console.log("reponse erronée:" + this.falsechecked);
      } else {
        if (resp.iscorrect == false) {
        this.falsechecked = this.falsechecked - 1;
          console.log("reponse erronée:" + this.falsechecked);
        };
      }
      console.log("the id is " + respId);


      if (-1 != respId) {
        console.log("supprimer de la liste avant :" + this.multiresponse.length);
        this.multiresponse.splice(respId, 1);
        console.log("supprimer de la liste now is :" + this.multiresponse.length);
      }
    }
  }
  verifyMulti() {

    let correctResponses: any[];
    correctResponses = this.quiz.responses.filter((resp) => { return resp.iscorrect });
    console.log('il y ' + correctResponses.length + 'correct reponse');
    console.log(' the coorects repsonse are: \n' + JSON.stringify(correctResponses));
    if (correctResponses.length == this.multiresponse.length && this.falsechecked == 0) {
      this.answeredCorrect = true;

    } else { this.answeredCorrect = false; }
    this.navCtrl.push(ResultPage, { answeredCorrect: this.answeredCorrect, quiz: this.quiz });

  }
}
