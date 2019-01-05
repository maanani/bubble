import { Component } from '@angular/core';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Item } from 'ionic-angular';
import { TodolistProvider } from '../../providers/todolist/todolist';
import {DatabaseProvider} from'../../providers/database/database';
//import {AddtaskPage} from '../add-task/add-task';
import { AjoutertaskPage } from '../ajoutertask/ajoutertask';
import { EditListPage } from './../edit-list/edit-list';
import { SettingPage } from '../setting/setting';
import { UpdatetaskPage } from '../updatetask/updatetask';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
//import { AddTaskPage } from '../add-task/add-task';
/**
 * Generated class for the TodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {

  database: any;
  public tasks = [];
  public pendingTasks = [];
  public doneTasks = [];
 public categories=[];
 public famille=[];

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,private databaseprovider: DatabaseProvider, private alertCtrl:AlertController,public ga:GoogleAnalytics) {
    this.googleAnalytics();
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadCategoriesData();
      }
    })
    //this.todolistProvider.populateTables();
  }
  loadCategoriesData() {
    this.databaseprovider.getAllCategories().then(data => {
      this.categories = data;
    })
  }
  getalltaskData() {
    this.databaseprovider.getAlltask().then(data => {
      this.tasks = data;
      console.log(JSON.stringify(this.tasks));
    })
  }
  CatorgorisMatch(idcategorie){

  }  
  /* public GetCategories(){
    
    this.todolistProvider.GetCategories().then((data) => {
      console.log(data);
      this.categories =<Array<Object>> data;
      console.log("IN the GET:",JSON.stringify(this.categories));
    }, (error) => {
      console.log("Geterror:",error);
    })
  }  */
  ionViewWillEnter(){
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
    if (rdy) {
      
      this.getalltaskData();
      console.log('TOTO ionViewDidLoad loading tasks');
    }
  })}
  ionViewDidLoad() {   
   // this.todolistProvider.populateTables();
   //this.GetCategories();

   this.databaseprovider.getDatabaseState().subscribe(rdy => {
    if (rdy) {
      
      this.getalltaskData();
      console.log('TOTO ionViewDidLoad loading tasks');
    }
  })
  //console.log("ionview",JSON.stringify(this.categories));
      //this.updateTask()
    //console.log('TOTO ionViewDidLoad TodolistPage');
  }
  
  
  
  // tache selecionné
  checkItem(item) {

    console.log( "valeur de "+item.isDone)
    return  this.databaseprovider.updateisDone(item);
    // this.tasks.find((res) => {
    //   return (res.id === item.id)
    // });
    // this.updateTask(item)
  }
  
  presentAddModal() {
    
    let addModal = this.modalCtrl.create(AjoutertaskPage);
    //refresh après ajout
    addModal.onDidDismiss(() => {
      this.getalltaskData();
    });
    addModal.present();
  }
  
  deleteItem(slidingItem:any,id){
    let alert = this.alertCtrl.create({
      title: 'Supprimer la tache',
      message: 'Etes vous sûr de voiloir supprimer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            slidingItem.close();
            this.databaseprovider.deleteTask(id).then((res)=>{
              this.getalltaskData();

           // this.navCtrl.pop();
            });
                   //console.log('call clicked' + agence.telephone);
          }
        }
      ]
    });
    alert.present();
  }
    
  

  editItem(slidingItem,id){
    

    this.navCtrl.push(UpdatetaskPage,{item:id});
    
    // var task=this.databaseprovider.getTask(id);
    // console.log("your task"+task);


   
    //refresh après ajout
   
    
  // aller sur page modification avec en param id ?
  }
  

  updateTask(item) {
    // this.tasks.find((res) => {
    //   return (res.id === item.id)
     
    // });
    return  this.databaseprovider.updateisDone(item);
  }
  openModal(){
    this.navCtrl.push(SettingPage,{});
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('todolist');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}
