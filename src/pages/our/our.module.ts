import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurPage } from './our';

@NgModule({
  declarations: [
    OurPage,
  ],
  imports: [
    IonicPageModule.forChild(OurPage),
  ],
})
export class OurPageModule {}
