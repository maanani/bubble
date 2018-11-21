import { Component } from '@angular/core';
import { Home3Page } from '../home3/home3';
import { TodolistPage } from '../todolist/todolist';
//import{ ContentPage} from '../content/content'
import { AgencesPage } from '../agences/agences';
import { DuaalistPage } from '../duaalist/duaalist';
//import { AddtaskPage } from '../addtask/addtask'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home3Page;
  //tab2Root = DuaaPage;
  tab2Root = DuaalistPage;
  //tab3Root = QuizPage;
  tab3Root = DuaalistPage;
  tab4Root = TodolistPage;
  tab5Root = AgencesPage;


  constructor() {

  }
}
