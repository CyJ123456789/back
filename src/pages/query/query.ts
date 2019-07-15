import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {HomePage} from "../home/home";
import {DrugDetailPage} from "../drug-detail/drug-detail";
import {IllnessPage} from "../illness/illness";
import {Keyboard} from "ionic-angular";
import {DataService} from "../service/data.service";

declare var $:any;


/**
 * Generated class for the QueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-query',
  templateUrl: 'query.html',
})
export class QueryPage {
  homepage=HomePage;
  search;
  list:any[] = [];
  item1:any[] = [];
  list7:any[] = [];
  drugDetail=DrugDetailPage;
  illness=IllnessPage;
  start=6;
  start1=6;
  start2=6;
  @ViewChild('div') div;
  @ViewChild('span') span;
  @ViewChild('span1') span1;
  @ViewChild("p") p
  @ViewChild('p1') p1
  @ViewChild ('input') input;
  @ViewChild('clavier') clavier
  @ViewChild('p2') p2
  @ViewChild ("span2") span2
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private keyboard:Keyboard,) {
  }
  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    this.data.user['buttonPage']="猪八戒"
    this.data.user['biaoshi']=""
  }

  change(){
    if(this.search==undefined||this.search==""){
      this.div.nativeElement.style.display="none";
      this.list=[];
    }else {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':6,'drug':this.search,'start':0,'num':100},
        dataType: 'json',
        success:(res)=> {
          if(res.length>6){
            this.p.nativeElement.style.display="block";
          }else{
            this.p.nativeElement.style.display="none";
          }
        }
      })

      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':6,'drug':this.search,'start':0,'num':6},
        dataType: 'json',
        success:(res)=> {
          this.list=res
          if(res.length!=0){
            this.div.nativeElement.style.display="block";
            this.span.nativeElement.style.display="none"
          }else{
            this.span.nativeElement.style.display="block"
          }
        }
      })

      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':60,'drug':this.search,'start':0,'num':20},
        dataType: 'json',
        success:(res)=> {
          console.log(res)
          if(res.length>6){
            this.p2.nativeElement.style.display="block";
          }else{
            this.p2.nativeElement.style.display="none";
          }
        }
      })
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':60,'drug':this.search,'start':0,'num':6},
        dataType: 'json',
        success:(res)=> {
          this.list7=res;
          if(res.length!=0){
            this.div.nativeElement.style.display="block";
            this.span2.nativeElement.style.display="none";
          }else{
            this.span2.nativeElement.style.display="block";
          }
        }
      })

      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':7,'disease':this.search,'start':0,'num':100},
        dataType: 'json',
        success:(res)=> {
          if(res.length>6){
            this.p1.nativeElement.style.display="block";
          }else{
            this.p1.nativeElement.style.display="none";
          }
        }
      })
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':7,'disease':this.search,'start':0,'num':6},
        dataType: 'json',
        success:(res)=> {
          this.item1=res;
          if(res.length!=0){
            this.div.nativeElement.style.display="block";
            this.span1.nativeElement.style.display="none";
          }else{
            this.span1.nativeElement.style.display="block";
          }
        }
      })
    }
  }

  /* 加载更多的药品名 */
  drugload(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':6,'drug':this.search,'start':this.start,'num':6},
      dataType: 'json',
      success:(res)=> {
        if(res.length<6){
          this.p.nativeElement.style.display="none";
        }
        for(var b=0;b<res.length;b++){
          this.list.push(res[b])
        }
        this.start+=6;
      }
    })
  }

  /* 加载更多按症状查询的药品名 */

  symptomload(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':60,'drug':this.search,'start':this.start2,'num':6},
      dataType: 'json',
      success:(res)=> {
        if(res.length<6){
          this.p2.nativeElement.style.display="none";
        }
        for(var b=0;b<res.length;b++){
          this.list7.push(res[b])
        }
        this.start2+=6;
      }
    })
  }

  /*  加载更多疾病 */
  illnessload(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':7,'disease':this.search,'start':this.start1,'num':6},
      dataType: 'json',
      success:(res)=> {
        if(res.length<6){
          this.p1.nativeElement.style.display="none";
        }
        for(var c=0;c<res.length;c++){
          this.item1.push(res[c])
        }
        this.start1+=6;
      }
    })
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
