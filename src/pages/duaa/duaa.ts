import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { WpProvider } from '../../providers/wp/wp';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { database } from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';

/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-duaa',
  templateUrl: 'duaa.html',
})
export class DuaaPage {

  ID_CONTENT_DUAA = 8577390;

  posts: Array<any> = new Array<any>();
  favorite: boolean = false;
  public lastSlide: any;
  public idDuaa;
  public idToGo;
  firstSlide: any;
  public numSlides: any;
  currIndex: any;
  @ViewChild('pageSlider') viewer: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public wpProvider: WpProvider, public loadingCtrl: LoadingController) {
    let idContent = this.ID_CONTENT_DUAA;
    this.posts=this.navParams.get('duaalist');
    this.idToGo=this.navParams.get('idtogo');
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
  moveback(){
    this.viewer.slidePrev();
  }
  
  ionViewDidLoad() {
    // test didload
    let idContent = this.ID_CONTENT_DUAA;
    
    if (!(this.posts.length > 0)) {
       let loading = this.loadingCtrl.create();
         loading.present();
         this.goToSlide(this.idToGo);
         loading.dismiss();}
        
    //0811
  //   if (!(this.posts.length > 0)) {
  //     let loading = this.loadingCtrl.create();
  //     let i=0;
  //     loading.present()
  //  this.wpProvider.getPosts(idContent)
  //       .subscribe(data => {
  //         for (let post of data) {
  //           post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
  //           post.title.rendered = post.title.rendered.split('<a')[0] + "</p>";
  //           post.favorite=false;
  //           post.idSlide= i++;
  //           console.log("the post idSlide  is :"+ post.idSlide);
  //           this.posts.push(post);
  //         }
          
  //         loading.dismiss();
  //         let duaa =this.posts.find((post) => { return post.id == this.idDuaa });

  //         console.log('ionViewWillEnter douaaPage is'+duaa.idSlide);
  //         this.idToGo=duaa.idSlide;
  //         this.goToSlide(this.idToGo);
  //         //this.viewer.slideTo(duaa.idSlide);
  //       });
    ///////////////// //end 0811  
      
       // this.idDuaa=this.navParams.get('idDuaa');
         // console.log('ionViewWillEnter douaaPage is'+this.idDuaa);
          
   // }
    
   ////end 0811   console.log('ionViewDidLoad douaaPage');
    ////end 0811  
  }
  addtoFavorite(post) {
    //this.databaseprovider.addFavDuaa(post.idDuaa);
    //A COMPLETER++++++++++++++++++
    
    //this.posts.favorite = true;
  }
  removeFavorite(){
    this.favorite=false;
  }
  ionViewDidEnter() {
    console.log('ionViewDidenter douaaPage');
   // this.goToSlide(4);
    //this.idDuaa=this.navParams.get('idDuaa');
  console.log('ionViewDidenter douaaPage is'+this.idToGo);
  this.goToSlide(this.idToGo);
  console.log('ionViewDidenter douaaPage');
  //this.goToSlide(this.idToGo);
    //this.morePagesAvailable = true;

    //if we are browsing a category
    // this.categoryId = this.navParams.get('id');
    // this.categoryTitle = this.navParams.get('title');

   //ici  le load post si besoin a remettre
  }
  goToSlide(idGo) {

    console.log("the id is :"+ idGo);
    let duaa=this.posts.find((post) => { return post.id == idGo });
  
    console.log("the idSlide  is :"+ duaa.idSlide);
   this.viewer.slideTo(duaa.idSlide);
  }
  addto(){
      
    

    
  }
}
