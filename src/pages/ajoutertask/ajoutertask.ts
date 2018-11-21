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
  
    public tasks: any;
    public item:String;
    public description:String;
    categories: any;
    idCategorie:any;
    constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
     // this.categorie=this.navParams.get('idCategorie')
    }
  
    ionViewDidLoad() {
    this.databaseprovider.getAllCategories().then(data => {
        this.categories = data;
      });
      console.log('ionViewDidLoad AddtaskPage');
    }
    dismiss(){
      this.viewCtrl.dismiss();
    }
    select(categorie){
      this.idCategorie=categorie;
    }
    add(){

      let task;
      task=[this.item, this.description,this.idCategorie];
      
      this.databaseprovider.addTask(task);

      this.dismiss();
    }
  
  }
  


