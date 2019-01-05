import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { WpProvider } from '../../providers/wp/wp';
import{ContentPage} from '../content/content';
import { QuizPage } from '../quiz/quiz';
import { SettingPage } from '../setting/setting';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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
  

  constructor(public navCtrl: NavController, public wpProvider: WpProvider,public navParams: NavParams, public loadingCtrl: LoadingController,public ga: GoogleAnalytics) {
    this.googleAnalytics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home3Page');
    this.getContent(324957);
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

  private getContent(parent: number) {
    console.log("longeur avant: "+this.courses.length)
    if (!(this.courses.length > 0)) {

      
      let loading = this.loadingCtrl.create({spinner:'bubbles',duration:3000});

     // let i = 0;
      loading.present();
      this.wpProvider.getAllCategories()
        .subscribe(data => {
          console.log("longeur data : "+data.length);
          for (let post of data) {
            console.log( "parent is " +post.parent);
            if (post.parent==parent){this.courses.push(post);}
            //this.courses.push(post);
          }
          console.log("longeur après : "+this.courses.length);
          loading.dismiss();
        });
    }
  }
  openModal(){

    this.navCtrl.push(SettingPage,{});
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('home_hajj');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  
  }
}
