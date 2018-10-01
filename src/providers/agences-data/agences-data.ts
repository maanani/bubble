import { HttpClient } from '@angular/common/http';
import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AgencesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgencesDataProvider {

  agences: { id: string; nom: string; Adresse: string; Tel: string; email: string; }[];
  constructor(public http: Http) {
    console.log('Hello AgencesDataProvider Provider');
    this.agences = [
      { id: '1', nom: 'one', Adresse: 'one adress', Tel: '111111111111', email: 'pne@one.com' },
      { id: '2', nom: 'two', Adresse: 'one adress', Tel: '22222222222222', email: 'two@one.com' },
      { id: '3', nom: 'three', Adresse: 'one adress', Tel: '44444444433', email: 'tree@one.com' },
      { id: '4', nom: 'four', Adresse: 'one adress', Tel: '44444444444', email: 'four@one.com' },
      { id: '5', nom: 'five', Adresse: 'one adress', Tel: '555555555555', email: 'five@one.com' },
      { id: '6', nom: 'six', Adresse: 'one adress', Tel: '666666666666', email: 'sixsix@one.com' }
    ]
  }
  filterItems(searchTerm) {

    return this.agences.filter((agence) => {
      return agence.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  findAgence(id) {
    return this.agences.find((agence) => { return agence.id == id })
  }
}
