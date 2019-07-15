import { Component,ViewChild} from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {InquiryPage} from "../inquiry/inquiry";
import {QuickQuestionPage} from "../quick-question/quick-question";
import {Keyboard} from "ionic-angular";
import {CommentSearchPage} from "../comment-search/comment-search";
import { SplashScreen } from '@ionic-native/splash-screen';
import {DataService} from "../service/data.service";

declare var $:any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  inquiry=InquiryPage;
  comment=CommentSearchPage;
  num:number=5;
  search;
  quick=QuickQuestionPage;
  querylist: any[] = [];
  constructor(public navCtrl: NavController,
              private nav:PagebuttonService,
              private keyboard:Keyboard,
              private alert:AlertController,
              private data:DataService
  ){}
  @ViewChild("u1")  u1;
  ionViewDidLoad(){
    window.addEventListener('native.keyboardshow',(e:any) =>{
      this.u1.nativeElement.style.marginBottom=e.keyboardHeight+"px";
    });
    window.addEventListener("native.keyboardhide",()=>{
      this.u1.nativeElement.style.marginBottom=0+"px"
    })
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']="缩小app"
    console.log(this.data.user['alertList'])
    console.log("我是谁")
    this.num=5;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control': 38, 'start':0,'num':5 },
      dataType: 'json',
      success: (res) => {
        console.log(res)
        var data=[];
        for(var b=0;b<res.length;b++){
          let year=new Date(res[b].datetime).getFullYear()
          let mounth=new Date(res[b].datetime).getMonth()+1
          let date = new Date(res[b].datetime).getDate()
          let dateTime = year + "." + mounth + "." + date
          var maxSize =45;
          var content=res[b].content;
          res[b].view_count=Number(res[b].view_count);
          if (res[b].view_count==''||res[b].view_count==undefined){
            res[b].view_count=0;
          }
          if(res[b].content.length>maxSize){
            var content1=content.substring(0,maxSize-1)+"...";
          }else {
            content1=content;
          }
          data.push({"picture":res[b].picture,"picture2":res[b].picture2,"picture3":res[b].picture3,'head_portrait':res[b].head_portrait,'dateTime':dateTime,'content':content,'content1':content1,'nickname':res[b].nickname,'title':res[b].title,'view_count':res[b].view_count,'question_id':res[b].question_id,'num':res[b].num})
          this.querylist=data;
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
  load(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control': 38, 'start':this.num,'num':5 },
      dataType: 'json',
      success: (res) => {
        console.log(res)
        if (res.length!=0){
          this.num+=5;
          for(var c=0;c<res.length;c++){
            let year=new Date(res[c].datetime).getFullYear()
            let mounth=new Date(res[c].datetime).getMonth()+1
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
            this.querylist.push({"picture":res[c].picture,"picture2":res[c].picture2,"picture3":res[c].picture3,'head_portrait':res[c].head_portrait,'dateTime':dateTime,'content':content,'content1':content1,'title':res[c].title,'nickname':res[c].nickname,'view_count':res[c].view_count,'question_id':res[c].question_id,'num':res[c].dialoguenum});
            console.log(this.querylist)
          }
        }
      }
    })
  }

  quick1(){
    if(this.data.user['switch']==="我是你"){
      let alert = this.alert.create({
        title: "你还未登录账号",
        cssClass:'projectList',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      }).present();
    }else {
      this.nav.goPage(QuickQuestionPage)
    }
  }
}
