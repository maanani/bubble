import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


/**
 * Generated class for the AjoutertaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajoutertask',
  templateUrl: 'ajoutertask.html',
})
export class AjoutertaskPage {
  
    public tasks: any = [];
    public item:String;
    public description:String;
  
    constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad AddtaskPage');
    }
    dismiss(){
      this.viewCtrl.dismiss();
    }
    add(){
      
      this.databaseprovider.addTask(this.item, this.description);

      this.dismiss();
    }
  }
  


