import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugUseRecordPage } from './drug-use-record';

@NgModule({
  declarations: [
    DrugUseRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugUseRecordPage),
  ],
})
export class DrugUseRecordPageModule {}
