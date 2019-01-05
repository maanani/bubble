import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'; //MM
import { SignupPage } from '../signup/signup'; //MM

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { AngularFireAuth } from 'angularfire2/auth';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const DATABASE_FILE_NAME: string = 'data.db';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  private db: SQLiteObject;
connected: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private toast: Toast,private angufireAuth:AngularFireAuth, public ga:GoogleAnalytics) {
    this.googleAnalytics();
  }

  ionViewDidLoad() {
    var user = this.angufireAuth.auth.currentUser;

if (user) {

  this.connected= true;
  console.log( this.connected+ 'with'+ user.email);
  // User is signed in.
} else {
  this.connected=false
  // No user is signed in.
}
    console.log('ionViewDidLoad WelcomePage');
  }
  //MM login boutton action
  loginPage() {
    this.navCtrl.push(LoginPage, {}, { animate: false });
  }
  //MM-signp action
  signupPage() {
    this.navCtrl.push(SignupPage, {}, { animate: false });
  }
  //Creation de la Base de données.
  private createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créée !');
        this.db = db;
        this.createTables();
        this.populateTables();
      })
      .catch(e => console.log(e));
  }


  private createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `todocategories` ( `idCategorie` INTEGER NOT NULL UNIQUE, `nomCategorie` TEXT NOT NULL, PRIMARY KEY(`idCategorie`) )', {})
      .then(() => {
        console.log('Table 1 created !');

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `todolistes` ( `idTodo` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `categorieId` INTEGER NOT NULL, `title` TEXT NOT NULL, `description` TEXT, FOREIGN KEY(`categorieId`) REFERENCES `todocategories`(`idCategorie`) )', {})
          .then(() => console.log('Table 2 created !'))
          .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }
  populateTables(): any {

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM todocategories', [])
        .then(res => {
          if (res.rows.lenght == 0) {
            db.executeSql('INSERT INTO todocategories VALUES(?,?)', [1, 'default'])
              .then(res => {
                console.log(res);
                this.toast.show('Data saved', '5000', 'center').subscribe(
                  toast => {

                    this.navCtrl.popToRoot();
                  }
                );
              }).catch(e => {
                console.log(e);
                this.toast.show(e, '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              });

          }

        }).catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });

    });
  }
  googleAnalytics(){
    this.ga.startTrackerWithId('UA-130246723-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('welcome');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    }
}