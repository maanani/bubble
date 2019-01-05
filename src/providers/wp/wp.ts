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

export const WORDPRESS_URL = 'https://public-api.wordpress.com/wp/v2/sites/';
export const WORDPRESS_REST_API_URL = WORDPRESS_URL+'manassik.wordpress.com/' ;
export const WORDPRESS_DOUAA_REST_API_URL= WORDPRESS_URL+'douaa.travel.blog/';
export const WORDPRESS_ZIYRAT_REST_API_URL=WORDPRESS_URL+'manassik.wordpress.com/posts?categories=2803688&orderby=slug&order=asc';
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
      + category_url+'&orderby=title&order=asc')
    .map(res => res.json());
  }
  getCategories(categoryId:string){
       
    //if we want to query a specifique category sinon ALL
    let category_url = categoryId? ("categories/" + categoryId): "categories/";
   console.log(' url est: '+category_url);
   this.http.get(WORDPRESS_REST_API_URL + category_url)
   .map(res => res.json());

    return this.http.get(WORDPRESS_REST_API_URL + category_url)
    .map(res => res.json());

  }
  getAllCategories(){
        
    //if we want to query a specifique category sinon ALL
    let category_url = "categories?per_page=20&orderby=name";
   console.log(' url est: '+category_url);
   //let categories;
    return this.http.get(WORDPRESS_REST_API_URL + category_url).map(res => res.json());
    //console.log(  JSON.stringify(categories) );
    //return categories;
  }
  getDoua(){
    //use page=1 si on veut limiter au 10 récent ...mais c'est pas d actualité
    
    //if we want to query posts by category
    //let category_url = categoryId? ("categories=" + categoryId): "";
   
    return this.http.get(
      WORDPRESS_DOUAA_REST_API_URL
      + 'posts?'
      +'&orderby=slug&order=asc')
    .map(res => res.json());
  }
  getZiyarat(){
    return this.http.get(
     WORDPRESS_ZIYRAT_REST_API_URL)
    .map(res => res.json());
  }
  
}

