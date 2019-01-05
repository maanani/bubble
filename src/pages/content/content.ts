import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams,LoadingController, Content } from 'ionic-angular';

import { WpProvider } from '../../providers/wp/wp';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { SettingPage } from '../setting/setting';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {

  posts: Array<any> = new Array<any>();
  public lastSlide:any;
  public firstSlide=true;
  public numSlides:any;
  public numberPosts:number;
  currIndex:any;
  @ViewChild('pageSlider') viewer: Slides;
  @ViewChild(Content) pContent: Content;
  content: any;
  pageTitle: any;
  constructor(public _app:App,public navCtrl: NavController, public navParams: NavParams,public wpProvider:WpProvider, public loadingCtrl: LoadingController, public ga:GoogleAnalytics) {
    this.googleAnalytics();
    this.content=this.navParams.get('content');
    
    this.pageTitle=this.content.name;

  }
  onSlideMoved() {
      this.currIndex = this.viewer.getActiveIndex(),
      this.numSlides = this.viewer.length(),
      this.firstSlide = this.viewer.isBeginning(),
      this.lastSlide = this.viewer.isEnd();
 
    console.log(`Current index is, ${this.currIndex}/${this.numSlides}`);
 
    if (this.firstSlide) {
      console.log(`This is the first slide of ${this.numSlides} slides`);
    }
    else if (this.lastSlide) {
      console.log(`This is the last ${this.lastSlide} slide of ${this.numSlides} slides`);
    }
  }
  moveNext(){
    this.scrollToTop();
    this.viewer.slideNext();
  
  }
  scrollToTop() {
    this.pContent.scrollToTop();
  }
  movePrev(){
    this.pContent.scrollToTop();
    this.viewer.slidePrev();
  }
  startQuiz(){
    this.navCtrl.push(QuizPage,{idCourse:this.content.id});
  }
  ionViewDidLoad() {
    
    console.log(document.title);

  //  this._app.setTitle(this.content.name);
    console.log('ionViewDidLoad content TILTLE'+this.content.name);
  }
  ionViewWillEnter() {
    //this._app.setTitle(this.content.name);
    

   //this.content=this.navParams.get('content');
    //this.morePagesAvailable = true;
    console.log('ionViewDidLoad ContentPage c ce que tu a envoyer! =>  '+this.content.name);
    //if we are browsing a category
    // this.categoryId = this.navParams.get('id');
    // this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create({spinner:'bubbles',duration:3000});
      loading.present();

      this.wpProvider.getPosts(this.content.id)
      .subscribe(data => {
        for(let post of data){
         //post.excerpt.rendered = post.excerpt.rendered.split('<a')[0]+"</p>";
         post.content.rendered = post.content.rendered +"</p>";
          this.posts.push(post);
        }
        this.numberPosts= this.posts.length.valueOf();
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
        this.ga.trackView('content');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}
