import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the ZiyartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ziyart',
  templateUrl: 'ziyart.html',
})

export class ZiyartPage {

  posts: Array<any> = new Array<any>();
  @ViewChild('pageSlider') viewer: Slides;
  @ViewChild(Content) pContent: Content;

  public lastSlide: any;
  public firstSlide: any;
  public numSlides: any;
  public currIndex: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public wpProvider: WpProvider, public loadingCtrl: LoadingController, public ga:GoogleAnalytics) {
    this.googleAnalytics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZiyartPage');
    this.getContent();
  }

  onSlideMoved() {

      this.currIndex = this.viewer.getActiveIndex(),
      this.numSlides = this.viewer.length(),
      this.firstSlide = this.viewer.isBeginning(),
      this.lastSlide = this.viewer.isEnd();

    // console.log(`Current index is, ${this.currIndex}/${this.numSlides}`);

    // if (this.firstSlide) {
    //   console.log(`This is the first slide of ${this.numSlides} slides`);
    // }
    // else if (this.lastSlide) {
    //   console.log(`This is the last ${this.lastSlide} slide of ${this.numSlides} slides`);
    // }
  }
  moveback() {this.scrollToTop(); this.viewer.slidePrev(); }
  moveNext() { this.scrollToTop();this.viewer.slideNext(); }

  scrollToTop() {
    this.pContent.scrollToTop();
  }
  private getContent() {
    if (!(this.posts.length > 0)) {
      let loading = this.loadingCtrl.create({spinner:'bubbles',duration:3000});

      let i = 0;
      loading.present();
      this.wpProvider.getZiyarat()
        .subscribe(data => {
          for (let post of data) {

            post.content.rendered = post.content.rendered;
            post.title.rendered = post.title.rendered.split('<a')[0] + "</p>";

            post.idSlide = i++;
            this.posts.push(post);
          }
          loading.dismiss();
        });
    }
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('duaa');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}
