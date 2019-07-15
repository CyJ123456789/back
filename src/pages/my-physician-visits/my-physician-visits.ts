import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {InquiryPage} from "../inquiry/inquiry";
import {MyQuestionPage} from "../my-question/my-question";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";

declare var $:any;
/**
 * Generated class for the MyPhysicianVisitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-physician-visits',
  templateUrl: 'my-physician-visits.html',
})
export class MyPhysicianVisitsPage {
  datalist: any[] = [];
  inquiry=InquiryPage
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private storage:Storage
              ) {
  }

  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    let b=this.storage.get('phone')
    b.then((data)=>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 46, 'userid':data},
        dataType: 'json',
        success: (res) => {
          console.log(res)
          var data=[];
          for(var c=0;c<res.length;c++){
            res[c].datetime=res[c].datetime.slice(0,10)
            var content=res[c].content;
            var maxSize=45;
            if(res[c].content.length>maxSize){
              var content1=content.substring(0,maxSize-1)+"...";
            }else {
              content1=content;
            }

            data.push({'picture':res[c].picture,'picture2':res[c].picture2,'picture3':res[c].picture3,'datetime':res[c].datetime,'title':res[c].title,'content':content,'content1':content1,'nickname':res[c].nickname,'view_count':res[c].view_count,'question_id':res[c].question_id,'num':res[c].num})
          }
          this.datalist=data;
        }
      })
    })
  }
  sum_skip(detail,quest_id){
    this.nav.goPage(MyQuestionPage,{detail:detail});
  }
}
