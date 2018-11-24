import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

const DATABASE_FILE_NAME: string = 'data00.db';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>; //voir doc please

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'DATABASEMM',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

  fillDatabase() {
    this.http.get('assets/dummy.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  async addCategories(id, newcategorie) {
    let data = [id, newcategorie]
    try {
      const data_1 = await this.database.executeSql("INSERT INTO todocategories (idCategorie,nomCategorie) VALUES(?,?);", data);
      return data_1;
    }
    catch (err) {
      console.log('Error: ', err);
      return err;
    }
  }

  async getAllCategories() {
    try {
      const data = await this.database.executeSql("SELECT * FROM todocategories", []);
      let categories = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          categories.push({ idCategorie: data.rows.item(i).idCategorie, nomCategorie: data.rows.item(i).nomCategorie });
        }
      }
      return categories;
    }
    catch (err) {
      console.log('Error: ', err);
      return [];
    }
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
  async addTask(task) {

    console.log(JSON.stringify(task));
    try {
      const data_1 = await this.database.executeSql("INSERT INTO todolistes (title,description,categorieId) VALUES(?,?,?);", task);
      return data_1;
    }
    catch (err) {
      console.log('Error: ', err);
      return err;
    }
  }
  getAlltask() {
    return this.database.executeSql("SELECT * FROM todolistes", []).then((data) => {
      let tache = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tache.push({id:data.rows.item(i).idTodo, title : data.rows.item(i).title, description: data.rows.item(i).description, categorieId:data.rows.item(i).categorieId ,isDone:data.rows.item(i).isDone});
        }
        console.log("getalltask",JSON.stringify(tache));
      }
      
      return tache;
      
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

deleteTask(id){
  console.log(" delating ... id :"+id);
  return this.database.executeSql ("DELETE FROM todolistes where idTodo==?",[id]).then((data)=>{
    console.log('deleted');
    return data });

}
  updateisDone(task){
  console.log(" item to update "+task.id+"and is" +task.isDone);
    return this.database.executeSql("UPDATE todolistes set isDone=? WHERE idTodo==?", [task.isDone,task.id]).then(data=>{ return data});
  }
  addFavDuaa(idDuaa) {
    let data = [idDuaa]
    console.log(JSON.stringify(data));
    return this.database.executeSql("INSERT INTO favoritesduaa (idDuaa) VALUES(?);", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  
  }
  async addAgences(agences) {

      /* console.log(JSON.stringify(task));
       try {
         const data_1 = await this.database.executeSql("INSERT INTO todolistes (title,description,categorieId) VALUES(?,?,?);", task);
         return data_1;
       }
       catch (err) {
         console.log('Error: ', err);
         return err;
         */
       }
}