import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodolistPage } from './todolist';

@NgModule({
  declarations: [
    TodolistPage,
  ],
  imports: [
    IonicPageModule.forChild(TodolistPage),
  ],
})
export class TodolistPageModule {}
