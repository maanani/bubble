import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgencesPage } from './agences';

@NgModule({
  declarations: [
    AgencesPage,
  ],
  imports: [
    IonicPageModule.forChild(AgencesPage),
  ],
})
export class AgencesPageModule {}
