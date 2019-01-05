import { Component } from '@angular/core';
import { Home3Page } from '../home3/home3';
import { TodolistPage } from '../todolist/todolist';
//import{ ContentPage} from '../content/content'
import { AgencesPage } from '../agences/agences';
import { DuaalistPage } from '../duaalist/duaalist';
import { ZiyartPage } from '../ziyart/ziyart';
import { OmraPage } from '../omra/omra';
//import { AddtaskPage } from '../addtask/addtask'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = Home3Page;
  // tab2Root = DuaalistPage;
  // tab6Root = Home3Page;
  // tab3Root = OptionsPage;
  // tab4Root = TodolistPage;
  // tab5Root = AgencesPage;


  tab1Root = Home3Page;
  tab2Root = OmraPage ;
  tab3Root = DuaalistPage;
  tab4Root = ZiyartPage;
  tab5Root = TodolistPage;
  tab6Root = AgencesPage;

  constructor() {

  }
}
