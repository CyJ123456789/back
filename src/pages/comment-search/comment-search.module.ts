import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentSearchPage } from './comment-search';

@NgModule({
  declarations: [
    CommentSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentSearchPage),
  ],
})
export class CommentSearchPageModule {}
