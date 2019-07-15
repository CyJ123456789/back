import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAdvicePage } from './doctor-advice';

@NgModule({
  declarations: [
    DoctorAdvicePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAdvicePage),
  ],
})
export class DoctorAdvicePageModule {}
