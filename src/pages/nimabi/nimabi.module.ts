import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NimabiPage } from './nimabi';

@NgModule({
  declarations: [
    NimabiPage,
  ],
  imports: [
    IonicPageModule.forChild(NimabiPage),
  ],
})
export class NimabiPageModule {}
