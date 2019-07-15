import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugQrPage } from './drug-qr';

@NgModule({
  declarations: [
    DrugQrPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugQrPage),
  ],
})
export class DrugQrPageModule {}
