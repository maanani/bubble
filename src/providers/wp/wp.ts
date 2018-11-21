import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { storage } from 'firebase';
/*
  Generated class for the WpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export const WORDPRESS_URL = 'manassik.wordpress.com/';
export const WORDPRESS_REST_API_URL ='https://public-api.wordpress.com/wp/v2/sites/'+ WORDPRESS_URL ;


@Injectable()

export class WpProvider {

  constructor(public http: Http) {
    console.log('Hello WpProvider Provider');
  }
  getPosts(categoryId:number){
    //use page=1 si on veut limiter au 10 récent ...mais c'est pas d actualité
    
    //if we want to query posts by category
    let category_url = categoryId? ("categories=" + categoryId): "";
   
    return this.http.get(
      WORDPRESS_REST_API_URL
      + 'posts?'
      + category_url)
    .map(res => res.json());
  }
  getCategories(categoryId:string){
        
    //if we want to query a specifique category sinon ALL
    let category_url = categoryId? ("categories/" + categoryId): "categories/";
   console.log(' url est: '+category_url);
    return this.http.get(WORDPRESS_REST_API_URL + category_url)
    .map(res => res.json());
  }
}
