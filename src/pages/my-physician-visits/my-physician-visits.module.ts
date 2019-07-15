import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPhysicianVisitsPage } from './my-physician-visits';

@NgModule({
  declarations: [
    MyPhysicianVisitsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPhysicianVisitsPage),
  ],
})
export class MyPhysicianVisitsPageModule {}
