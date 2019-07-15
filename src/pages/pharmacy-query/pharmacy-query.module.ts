import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacyQueryPage } from './pharmacy-query';

@NgModule({
  declarations: [
    PharmacyQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacyQueryPage),
  ],
})
export class PharmacyQueryPageModule {}
