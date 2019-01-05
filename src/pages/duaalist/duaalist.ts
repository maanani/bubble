import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { WpProvider } from '../../providers/wp/wp';
import { DuaaPage } from '../duaa/duaa';
import { SettingPage } from '../setting/setting';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the DuaalistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duaalist',
  templateUrl: 'duaalist.html',
})



export class DuaalistPage {

posts: Array<any> = new Array<any>();
searchTerm: string = '';
searchControl: FormControl;
searching: any= false;

ID_CONTENT_DUAA = 8577390;

  //duaa: { id: string; nom: string; Adresse: string; Tel: string; email: string; }[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public wpProvider:WpProvider,public loadingCtrl: LoadingController,public ga:GoogleAnalytics) {
    this.googleAnalytics();
this.searchControl= new FormControl();
  }

/**
 * Generated class for the AgencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



  ionViewDidLoad() {
    console.log('ionViewDidLoad DuaalistPage');
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      // search control  c'est lui qui gère la recherche mtn
      // simulation:on attente  700ms
      this.searching=false;
      this.setFilteredItems();

  });
  }
  onSearchInput(){
    this.searching=true; //pour faire le load animation
  }
  setFilteredItems(){
  // VOIR AGENCZ RECHERCHE DNS AGENCEDATA
    //this.posts = this.wpProvider.getPosts(this.ID_CONTENT_DUAA);
  }
  ionViewWillEnter() {
    //let idContent = this.ID_CONTENT_DUAA;
    //this.morePagesAvailable = true;

    //if we are browsing a category
    // this.categoryId = this.navParams.get('id');
    // this.categoryTitle = this.navParams.get('title');

    this.getContent();
  }
  private getContent() {
    if (!(this.posts.length > 0)) {
      let loading = this.loadingCtrl.create({spinner:'bubbles',duration:3000});

      let i = 0;
      loading.present();
      this.wpProvider.getDoua()
        .subscribe(data => {
          for (let post of data) {
           // post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
           
           //post.content.rendered = post.content.rendered;
            post.content.rendered=post.content.rendered;
            post.title.rendered = post.title.rendered.split('<a')[0] + "</p>";
            post.favorite = false;
            post.idSlide = i++;
            this.posts.push(post);
          }
          loading.dismiss();
        });
    }
  }

  goToDuaa(id){
  console.log("id is:"+id);
   //0811 this.navCtrl.push(DuaaPage,{idDuaa:id});
   this.navCtrl.push(DuaaPage,{ duaalist:this.posts,idtogo:id});
    //let duaa= this.duaaData.get(id);
   
   // console.log('show ;'+ posts.title);
    

  }
  openModal(){

    this.navCtrl.push(SettingPage,{});
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('duaaList');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}

