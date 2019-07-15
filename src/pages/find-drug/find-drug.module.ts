import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindDrugPage } from './find-drug';

@NgModule({
  declarations: [
    FindDrugPage,
  ],
  imports: [
    IonicPageModule.forChild(FindDrugPage),
  ],
})
export class FindDrugPageModule {}
