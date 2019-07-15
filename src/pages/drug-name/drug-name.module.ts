import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugNamePage } from './drug-name';

@NgModule({
  declarations: [
    DrugNamePage,
  ],
  imports: [
    IonicPageModule.forChild(DrugNamePage),
  ],
})
export class DrugNamePageModule {}
