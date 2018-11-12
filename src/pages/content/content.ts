import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import { WpProvider } from '../../providers/wp/wp';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
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
  public lastSlide: any;
  firstSlide:any;
  public numSlides:any;
  currIndex:any;
  @ViewChild('pageSlider') viewer: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,public wpProvider:WpProvider, public loadingCtrl: LoadingController) {
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
    this.viewer.slideNext();
  }
  startQuiz(){
    
  }
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ContentPage');
  }
  ionViewWillEnter() {
    let idContent=this.navParams.get('idContent');
    //this.morePagesAvailable = true;

    //if we are browsing a category
    // this.categoryId = this.navParams.get('id');
    // this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wpProvider.getPosts(idContent)
      .subscribe(data => {
        for(let post of data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }


}
