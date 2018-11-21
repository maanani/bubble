import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { resolveDefinition } from '@angular/core/src/view/util';


/*
  Generated class for the QuizProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export const QUIZ_URL = 'assets/quiz.json';
@Injectable()

export class QuizProvider {

  constructor(public http: Http) {
    console.log('Hello QuizProvider Provider');

  }
  getallQuiz() {
;
    //use page=1 si on veut limiter au 10 récent ...mais c'est pas d actualité

    //if we want to query posts by category
    //let category_url = categoryId? ("categories=" + categoryId): "";
//let allQuiz:any;
  return this.http.get(
      QUIZ_URL)
      .map(res => res.json());//.subscribe(data => { console.log("this is the quiz" + JSON.stringify(data)); return data;  });


  }

  getQuiz(idcontent: number) {
    //use page=1 si on veut limiter au 10 récent ...mais c'est pas d actualité

    //if we want to query posts by category
    //let category_url = categoryId? ("categories=" + categoryId): "";
    // this.getallQuiz().find((quiz) => { return quiz.idContent == idcontent })
      
     // console.log("this is the quiz" + JSON.stringify(this.getallQuiz().find((quiz) => { return quiz.idContent == idcontent })));

   
    // json parser may be....
    //return quiz;

  }
}
