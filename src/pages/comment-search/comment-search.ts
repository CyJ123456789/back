import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {InquiryPage} from "../inquiry/inquiry";
import {DataService} from "../service/data.service";

declare var $:any;
/**
 * Generated class for the CommentSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-search',
  templateUrl: 'comment-search.html',
})
export class CommentSearchPage {
  search;
  querylist: any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }


  commentSearch(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control': 55,'question':this.search,'start':0,'num':5},
      dataType: 'json',
      success: (res) => {
        var data1=[]
        if (res.length!=0){
          for(var c=0;c<res.length;c++){
            let year=new Date(res[c].datetime).getFullYear()
            let mounth=new Date(res[c].datetime).getMonth()
            let date = new Date(res[c].datetime).getDate()
            let dateTime = year + "." + mounth + "." + date
            var maxSize =45;
            var content=res[c].content;
            res[c].view_count=Number(res[c].view_count);
            if (res[c].view_count==''||res[c].view_count==undefined){
              res[c].view_count=0;
            }
            if(res[c].content.length>maxSize){
              var content1=content.substring(0,maxSize-1)+"...";
            }else {
              content1=content;
            }
            data1.push({'picture':res[c].picture,'picture2':res[c].picture2,'picture3':res[c].picture3,'dateTime':dateTime,'content':content,'content1':content1,'title':res[c].title,'nickname':res[c].nickname,'view_count':res[c].view_count,'question_id':res[c].question_id,'num':res[c].num})
            this.querylist=data1;
          }
        }
      }
    })
  }

  sum_skip(detail,quest_id){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control': 39, 'question':quest_id, },
      dataType: 'json',
      success: (res) => {
        this.nav.goPage(InquiryPage,{detail:detail});
      }
    })
  }

  ionViewWillEnter(){
    this.data.user['biaoshi']=''
  }
  ionViewWillLeave(){
    this.search=""
    this.data.user['biaoshi']="缩小app"
  }
}
