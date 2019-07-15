import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalHistoryPage } from './medical-history';

@NgModule({
  declarations: [
    MedicalHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalHistoryPage),
  ],
})
export class MedicalHistoryPageModule {}
