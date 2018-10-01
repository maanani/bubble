import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutertaskPage } from './ajoutertask';

@NgModule({
  declarations: [
    AjoutertaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutertaskPage),
  ],
})
export class AjoutertaskPageModule {}
