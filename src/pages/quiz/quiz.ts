import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { QuizProvider } from '../../providers/quiz/quiz';
import { Quiz } from '../../models/quiz';
import { ResultPage } from '../result/result';
import { SettingPage } from '../setting/setting';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


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
  idContent = 0;
  public allQuiz: Array<any> = new Array<any>();
  response: {
    id: string;
    answer: string;
    iscorrect: boolean;
    idQuiz: string;
  };

  multiresponse: Array<any> = new Array<any>();
  answers: Array<any> = new Array<any>();
  falsecheked: boolean;
  falsechecked = 0;

  idOmra: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public quizProvider: QuizProvider, private modalCtrl: ModalController, public ga: GoogleAnalytics) {
    //this.quiz=this.quizProvider.getQuiz(1);
    this.googleAnalytics();
    this.getallquiz();
  }

  ionViewDidLoad() {
    this.answeredCorrect = false;
    // this.response.iscorrect=false;
    // mettre la velur du contenu recupérer du httpparam
  // console.log("previous page: "+ this.stringify(tthis.navCtrl.parent));
  if (this.navParams.get('idOmra')){
    this.idOmra=this.navParams.get('idOmra')
  }
  else
    this.idContent = this.navParams.get('idCourse');
    
    console.log('ionViewDidLoad QuizPage');


    ///////////////////////////////////////////////////////////////////
    /*****  ONE QUIZ RUSLUT
    this.quizProvider.getallQuiz().subscribe(res => {
      this.quiz = res.find((quiz) => { return quiz.idContent == this.idContent });
      console.log('the question is :' + this.quiz.question);
      console.log('Rep1:' + this.quiz.responses[0].answer);
      console.log('ionViewDidLoad QuizPage:' + JSON.stringify(this.quiz));
    });
    ***/
    ///////////////////////////////////////////////////////////////////

    //to complete

  }
  ionViewDidEnter() {
    this.answeredCorrect = false;
    console.log(" quiz ALL:" + JSON.stringify(this.allQuiz));
  }
  getallquiz() {
    let data: any;
    this.quizProvider.getallQuiz().subscribe(res => {
      data = res.filter((quiz) => { 
        if(this.idContent){
        return quiz.idContent == this.idContent
      }else{return quiz.idOmra == this.idOmra}
      
      
      
      });
      for (let quiz of data) {
        quiz.answered = false;
        this.allQuiz.push(quiz);
      }

      console.log('the question is :' + this.allQuiz);

    });
  }
  selectold(response) {
    this.response = response;

    console.log(" this response is" + this.response.id);
  }

  select(response, quiz) {

    let answer = {} as {
      id: string;
      answer: string;
      iscorrect: boolean;
      idQuiz: string;
    };
    // this.response = response;
    answer.id = response.id;
    answer.iscorrect = response.iscorrect;
    answer.answer = response.answer;
    answer.idQuiz = quiz.id
    const idQuiz = this.answers.findIndex((ans) => { return ans.idQuiz == quiz.id });
    console.log("found: " + idQuiz);
    if (-1 != idQuiz) {
      console.log("Found and supprimer de la liste ANSEERS avant :" + this.answers.length);
      this.answers.splice(idQuiz, 1);
      console.log("supprimer de la liste  ANSEERS now is :" + this.answers.length);
    }

    console.log(" You selected response is: " + answer.answer + " and it is :" + answer.iscorrect);

    this.answers.push(answer);

    //console.log(" this response is" + this.response.id);
  }
  verify(quiz) {
    let answer = {} as {
      id: string;
      answer: string;
      iscorrect: boolean;
      idQuiz: string;
    };
    this.answeredCorrect = false;
    answer = this.answers.find((ans) => { return ans.idQuiz == quiz.id });

    // console.log(" this response is" + this.response.id + " is " + this.response.iscorrect);
    if (answer && answer.iscorrect) {
      this.answeredCorrect = true;

    };
    this.resultModal(quiz);
    //this.navCtrl.push(ResultPage, { answeredCorrect: this.answeredCorrect, quiz: quiz });
  }
  addselectquiz(resp, quiz) {

    let answer = {} as {
      id: string;
      answer: string;
      iscorrect: boolean;
      checked: boolean;
      idQuiz: string;
    };
    console.log('you selected rep:' + resp.answer + 'and it is ' + resp.iscorrect);


    if (resp.checked == true) {
      console.log('adding :' + resp + 'because checked is ' + resp.checked);
      answer.id = resp.id;
      answer.answer = resp.answer;
      answer.idQuiz = quiz.id;
      answer.iscorrect = resp.iscorrect;
      answer.checked = resp.checked;

      this.multiresponse.push(answer);
      console.log("ajouter de la liste :" + this.multiresponse.length);
    } else {
      const respId = this.multiresponse.findIndex((res) => {
        return (res.id == resp.id && res.idQuiz == quiz.id)
      });
      if (-1 != respId) {
        console.log("supprimer de la liste avant :" + this.multiresponse.length);
        this.multiresponse.splice(respId, 1);
        console.log("supprimer de la liste now is :" + this.multiresponse.length);
      }

    }

  }
  verifyMulti(quiz) {
    this.answeredCorrect = false;
    let correctResponses: any[];
    correctResponses = quiz.responses.filter((resp) => { return resp.iscorrect });
    console.log('il y ' + correctResponses.length + 'correct reponse');
    console.log(' the coorects repsonses are: \n' + JSON.stringify(correctResponses));
    // let answers=this.multiresponse.filter((resp)=>{ return resp.id });
    if (correctResponses.length == this.multiresponse.filter((res) => { return res.idQuiz == quiz.id && res.iscorrect == true }).length && this.multiresponse.filter((res) => { return res.idQuiz == quiz.id && res.iscorrect == false }).length == 0) {
      this.answeredCorrect = true;

    } else {
    this.answeredCorrect = false;

    }
    // this.navCtrl.push(ResultPage, { answeredCorrect: this.answeredCorrect, quiz:quiz });
    this.resultModal(quiz);

  }
  resultModal(quiz) {

    let addModal = this.modalCtrl.create(ResultPage, { answeredCorrect: this.answeredCorrect, quiz: quiz });
    //refresh après ajout
    addModal.onDidDismiss(() => {
      let idQuiz = this.allQuiz.findIndex((res) => { return quiz.id == res.id });
      quiz.answered = true;
      this.allQuiz[idQuiz] = quiz;
      this.allQuiz = this.allQuiz;
      console.log(" quiz ALL:" + JSON.stringify(this.allQuiz));

    });
    addModal.present();
  }
  openModal() {

    this.navCtrl.push(SettingPage, {});
  }
  googleAnalytics() {
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('quiz_page');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  /************* OLD code to remove */
  /*
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
  */

  /************* OLD code to remove */
  /*
  verifyMultiQuiz(quiz) {
    this.answeredCorrect = false;
    let correctResponses: any[];
    correctResponses = quiz.responses.filter((resp) => { return resp.iscorrect});
    console.log('il y ' + correctResponses.length + 'correct reponse');
    console.log(' the coorects repsonse are: \n' + JSON.stringify(correctResponses));
   // let answers=this.multiresponse.filter((resp)=>{ return resp.id });
    if (correctResponses.length == this.multiresponse.length && this.falsechecked == 0) {
      this.answeredCorrect = true;
      this.multiresponse=[];
      this.falsechecked= 0;

    } else { this.answeredCorrect = false; 
      this.multiresponse=[];
      this.falsechecked= 0;
    }
   // this.navCtrl.push(ResultPage, { answeredCorrect: this.answeredCorrect, quiz:quiz });
   this.resultModal(quiz);

  }
*/

}
