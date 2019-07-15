import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickQuestionPage } from './quick-question';

@NgModule({
  declarations: [
    QuickQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickQuestionPage),
  ],
})
export class QuickQuestionPageModule {}
