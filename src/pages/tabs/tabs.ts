import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Home3Page } from '../home3/home3';
import { LogoutPage } from '../logout/logout';
import { TodolistPage } from '../todolist/todolist';
import { Home2Page } from '../home2/home2';
import{ ContentPage} from '../content/content'
import { AgencesPage } from '../agences/agences';
//import { AddtaskPage } from '../addtask/addtask'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home2Page;
  tab2Root = ContentPage;
  tab3Root = TodolistPage;
  tab4Root = AgencesPage;
    

  constructor() {

  }
}
