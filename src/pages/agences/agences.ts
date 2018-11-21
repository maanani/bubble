import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgencesDataProvider } from '../../providers/agences-data/agences-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';
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
  agences: any;
  result: any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public agenceData: AgencesDataProvider, private alertCtrl: AlertController, private CallNumber: CallNumber) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgencesPage');
    this.agenceData.getAgences().subscribe(res => { this.agences = res; this.setFilteredItems(); });
    //this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      // search control  c'est lui qui gère la recherche mtn
      // simulation:on attente  700ms
      this.searching = false;
      //this.result=this.agences;
      this.setFilteredItems();

    });
  }
  onSearchInput() {
    this.searching = true; //pour faire le load animation
  }
  setFilteredItems() {
    this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    console.log(JSON.stringify(this.agences));

    this.result = this.agences.filter((agence) => {
      return agence.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });


  }


  showDetails(nom) {
    let agence = this.agences.find((agence) => { return agence.nom == nom })
    // let  agence= agences.find ((ag)=>{return ag.id==id})
    console.log('show ;' + agence.nom);
    this.presentConfirm(agence);

  }
  presentConfirm(agence) {
    let alert = this.alertCtrl.create({
      title: agence.nom+' ('+agence.ville+')',
      message: 'voulez-vous contacter cette agence au :' + agence.telephone + '?',
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
             this.CallNumber.callNumber(agence.telephone, true);
                   //console.log('call clicked' + agence.telephone);
          }
        }
      ]
    });
    alert.present();
  }
}
