import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; //OK
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';//OK
import { Toast } from '@ionic-native/toast';
import { Injectable } from '@angular/core';//0K
import { Task } from '../../pages/todolist/task.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';//OK ???


const DATABASE_FILE_NAME: string = 'HAJB0.db';

/*
  Generated class for the TodolistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodolistProvider {
  //public task: any;
  //public todocategories: any;
  //public task_subject = new Subject<String>();
  private db: SQLiteObject;
  private isOpen: boolean; //OK
  private storage: SQLite;
  /* 
    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private sqlite: SQLite,
      private toast: Toast) */

  constructor() {
    if (!this.isOpen) {
      this.storage = new SQLite();
      console.log('OKSQLITE');
      this.storage.create({ name: DATABASE_FILE_NAME, location: "default" }).then((db: SQLiteObject) => {
        console.log('BD OKOOO');
        this.db = db;
        console.log('BD OK');
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `todocategories` ( `idCategorie` INTEGER NOT NULL UNIQUE, `nomCategorie` TEXT NOT NULL, PRIMARY KEY(`idCategorie`) )', [])
          .then(() => {
            console.log('Table 1 created !');

            this.db.executeSql('CREATE TABLE IF NOT EXISTS `todolistes` ( `idTodo` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `categorieId` INTEGER NOT NULL, `title` TEXT NOT NULL, `description` TEXT, FOREIGN KEY(`categorieId`) REFERENCES `todocategories`(`idCategorie`) )', {})
              .then(() => {
                this.db.executeSql('SELECT * FROM todocategories', {})
                  .then(res => {
                    console.log("todocategorierows", res.rows.length);
                    if (res.rows.length == 0) {
                      console.log("todocategorierows", res.rows.length)
                      db.executeSql('INSERT INTO todocategories VALUES(?,?)', [1, 'default'])
                        .then(res => {
                          console.log('populated')
                        }).catch(e => {
                          console.log('errrrrr')
                          console.log(e);
                        });
                      this.isOpen = true;
                      console.log('Table 2 created !');

                    }}
                  )})
              })
          }).catch((error) => {
            console.log(error);
          })

      }
  }
    populateTables() {

    }
    GetCategories() {
      return new Promise((resolve, reject) => {
        // console.log( this.db)
        this.storage.create({
          name: DATABASE_FILE_NAME,
          location: 'default'
        }).then((db: SQLiteObject) => {
          //this.db=db;
          console.log('getategoriesbd:' + this.db);
          db.executeSql("SELECT * FROM todocategories", []).then((data) => {
            let arrayCategories = [];
            console.log("datarows:", data.rows.length);
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                arrayCategories.push({
                  idcategorie: data.rows.item(i).idCategorie,
                  description: data.rows.item(i).nomCategorie,

                });
              }
            }
            console.log(JSON.stringify(arrayCategories));
            resolve(arrayCategories);
          }, (error) => {
            reject(error);
          })
        })
      })
    }

    addTask(item) { }

    createTables() { }

    getData() { }


  }