import { Component } from '@angular/core';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TodolistProvider } from '../../providers/todolist/todolist';
import {DatabaseProvider} from'../../providers/database/database';
//import {AddtaskPage} from '../add-task/add-task';
import { AjoutertaskPage } from '../ajoutertask/ajoutertask';
import { EditListPage } from './../edit-list/edit-list';
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

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,private databaseprovider: DatabaseProvider) {
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
  


  updateTask(item) {
    // this.tasks.find((res) => {
    //   return (res.id === item.id)
     
    // });
    return  this.databaseprovider.updateisDone(item);
  }

}
