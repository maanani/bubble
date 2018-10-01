import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgencesDataProvider } from '../../providers/agences-data/agences-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
/**
 * Generated class for the AgencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agences',
  templateUrl: 'agences.html',
})
export class AgencesPage {
agences:any;
searchTerm: string = '';
searchControl: FormControl;
searching: any= false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public agenceData:AgencesDataProvider, private alertCtrl: AlertController) {
this.searchControl= new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgencesPage');
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

    this.agences = this.agenceData.filterItems(this.searchTerm);
  }
  
  showDetails(id){
    let agence= this.agenceData.findAgence(id);
   // let  agence= agences.find ((ag)=>{return ag.id==id})
    console.log('show ;'+ agence.nom);
    this.presentConfirm(agence);

  }
  presentConfirm(agence) {
    let alert = this.alertCtrl.create({
      title: 'contacter agence',
      message: 'voules vous contacter cette agence:'+agence.nom+'?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'call',
          handler: () => {
            console.log('call clicked'+agence.Tel);
          }
        }
      ]
    });
    alert.present();
  }
}
