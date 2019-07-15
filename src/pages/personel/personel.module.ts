import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonelPage } from './personel';

@NgModule({
  declarations: [
    PersonelPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonelPage),
  ],
})
export class PersonelPageModule {}
