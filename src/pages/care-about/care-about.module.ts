import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareAboutPage } from './care-about';

@NgModule({
  declarations: [
    CareAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(CareAboutPage),
  ],
})
export class CareAboutPageModule {}
