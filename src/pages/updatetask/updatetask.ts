import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Title } from '@angular/platform-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the UpdatetaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatetask',
  templateUrl: 'updatetask.html',
})
export class UpdatetaskPage {
  public task:any;
  public item:any;
  public idTask;
  public description:String;
  categories: any;
  idCategorie:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public modalCtrl: ModalController,public navParams: NavParams,private databaseprovider: DatabaseProvider, public ga:GoogleAnalytics) {
    this.googleAnalytics();
   this.idTask=this.navParams.get('item');
   
  this.task=this.databaseprovider.getTask(this.idTask);
  console.log ( "YOUR TASK IS :"+this.task);

  }

  ionViewDidLoad() {
    this.databaseprovider.getAllCategories().then(data => {
      this.categories = data });
   
  } 
  select(idCategorie){
    this.task.categorieId= idCategorie;
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  add() {
    // this.tasks.find((res) => {
    //   return (res.id === item.id)
     
    // });
      this.databaseprovider.updateTask(this.task);
    this.dismiss();
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('updatetask');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}
