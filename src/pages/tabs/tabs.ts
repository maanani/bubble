import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Home3Page } from '../home3/home3';
import { LogoutPage } from '../logout/logout';
import { TodolistPage } from '../todolist/todolist';
import { Home2Page } from '../home2/home2';
//import{ ContentPage} from '../content/content'
import { AgencesPage } from '../agences/agences';
import { DuaaPage } from '../duaa/duaa';
import { DuaalistPage } from '../duaalist/duaalist';
import{Home4Page} from '../home4/home4';
import { QuizPage } from '../quiz/quiz';
//import { AddtaskPage } from '../addtask/addtask'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home3Page;
  //tab2Root = DuaaPage;
  tab2Root = DuaalistPage;
  tab3Root = QuizPage;
  //tab3Root = TodolistPage;
  tab4Root = Home2Page;
    

  constructor() {

  }
}
