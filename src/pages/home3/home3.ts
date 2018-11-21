import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { WpProvider } from '../../providers/wp/wp';
import{ContentPage} from '../content/content';
import { QuizPage } from '../quiz/quiz';

/**
 * Generated class for the Home3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home3',
  templateUrl: 'home3.html',
})
export class Home3Page {

  courses: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, public wpProvider: WpProvider,public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home3Page');
    this.getContent("");
  }
  loadcontent(course)
  {
    console.log( 'your going to =>'+course.name);
    this.navCtrl.push(ContentPage,{content:course});

  }
  loadquiz(course)
  {
    this.navCtrl.push(QuizPage,{idCourse:course.id});
  }

  private getContent(course: string) {
    if (!(this.courses.length > 0)) {
      let loading = this.loadingCtrl.create();
     // let i = 0;
      loading.present();
      this.wpProvider.getCategories(course)
        .subscribe(data => {
          for (let post of data) {

            this.courses.push(post);
          }
          loading.dismiss();
        });
    }
  }

}
