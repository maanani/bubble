import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
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
  }
  loadcontent(id)
  {
    this.navCtrl.push(ContentPage,{idCourse:id});

  }
  loadquiz(id)
  {
    this.navCtrl.push(QuizPage,{idCourse:id});
  }

  private getContent(idContent: number) {
    if (!(this.courses.length > 0)) {
      let loading = this.loadingCtrl.create();
      let i = 0;
      loading.present();
      this.wpProvider.getPosts(idContent)
        .subscribe(data => {
          for (let post of data) {
            post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
            post.title.rendered = post.title.rendered.split('<a')[0] + "</p>";
            post.favorite = false;
            post.idSlide = i++;
            this.courses.push(post);
          }
          loading.dismiss();
        });
    }
  }

}
