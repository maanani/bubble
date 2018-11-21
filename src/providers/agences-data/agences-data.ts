import { HttpClient } from '@angular/common/http';
import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AgencesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export const AGENCES_URL='assets/agences.json';
@Injectable()
export class AgencesDataProvider {

  public agences: any;
  constructor(public http: Http) {
    console.log('Hello AgencesDataProvider Provider')
   
     }
  getAgences(){

    return this.http.get(
      AGENCES_URL)
      .map(res => res.json());
      
      
   

//to complete may be
  }
 filterItems(searchTerm) {
       //console.log( JSON.stringify(res));
       this.getAgences().subscribe(res => {
          this.agences= res.filter((agence) => {
            return agence.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
          });
          console.log (this.agences);
         
        });
        
        return this.agences;

    // return this.agences.filter((agence) => {
    //   return agence.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    // });
  }
  findAgence(id) {
    return this.agences.find((agence) => { return agence.id == id })
  }
}
