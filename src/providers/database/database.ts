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

  addCategories(id, newcategorie) {
    let data = [id, newcategorie]
    return this.database.executeSql("INSERT INTO todocategories (idCategorie,nomCategorie) VALUES(?,?);", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getAllCategories() {
    return this.database.executeSql("SELECT * FROM todocategories", []).then((data) => {
      let categories = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          categories.push({ categorieId: data.rows.item(i).idCategorie, nomcategorie: data.rows.item(i).nomCategorie });
        }
      }
      return categories;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
  addTask(item, desciprition) {
    let data = [item, desciprition,2]
    console.log(JSON.stringify(data));
    return this.database.executeSql("INSERT INTO todolistes (title,description,categorieId) VALUES(?,?,?);", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  getAlltask() {
    return this.database.executeSql("SELECT * FROM todolistes", []).then((data) => {
      let tache = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tache.push({title : data.rows.item(i).title, description: data.rows.item(i).description, categorieId:data.rows.item(i).categorieId });
        }
        console.log("getalltask",JSON.stringify(tache));
      }
      
      return tache;
      
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
}