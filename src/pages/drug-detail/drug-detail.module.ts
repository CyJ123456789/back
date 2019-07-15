import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugDetailPage } from './drug-detail';

@NgModule({
  declarations: [
    DrugDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugDetailPage),
  ],
})
export class DrugDetailPageModule {}
