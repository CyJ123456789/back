import { Component,ViewChild } from '@angular/core';
import { NavController ,AlertController,Platform,Navbar,App} from 'ionic-angular';
import {QueryPage} from "../query/query";
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import {FindDrugPage} from "../find-drug/find-drug";
import {CheckDiseasePage} from "../check-disease/check-disease";
import {PharmacyQueryPage} from "../pharmacy-query/pharmacy-query";
import {DetailPage} from "../detail/detail";
import {AllertPage} from "../allert/allert";
import {QuickQuestionPage} from "../quick-question/quick-question";
import {Vibration} from "@ionic-native/vibration";
import {LocalNotifications} from "@ionic-native/local-notifications";
import { Storage } from '@ionic/storage';
import {QrScannerPage} from "../qr-scanner/qr-scanner";
import {variable} from "../../util/globalVariable";
import {DrugQrPage} from "../drug-qr/drug-qr";
import { BackgroundMode } from '@ionic-native/background-mode';

declare var $:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("h4")  h4
  data;             /*  文章分类1信息 */
  data1;           /* 被点击到的文章分类的信息 */
  data2;           /*  下拉时获取到的文章信息 */
  data3;
  data4;
  data5;
  timer;
  num:number=0;
  alertList=DrugQrPage;
  indentify:number=0;
  allert=AllertPage;
  time:any[] = [];  /* 每篇文章发布时间与当前时间的差值 */
  time1:any[] = [];
  time2:any[] = [];
  time3:any[] = [];
  time4:any[] = [];
  time5:any[] = [];
  list:any[] = [];
  number=0;
  pet: string ="1";
  querypage=QueryPage;
  find_drug=FindDrugPage;
  check_disease=CheckDiseasePage;
  pharmacy_query=PharmacyQueryPage;
  detail=DetailPage;
  quick=QuickQuestionPage;
  constructor(public navCtrl: NavController,
              private nav:PagebuttonService,
              private localNotifications: LocalNotifications,
              private storage:Storage,
              private platform:Platform,
              private vibration:Vibration,
              private information:DataService,
              private appCtrl:App,
              private backgroundMode:BackgroundMode,
              private alert:AlertController
              ) {
    platform.ready().then(()=>{

    })
  }
  ionViewWillEnter(){
    this.information.user['biaoshi']="缩小app"
    let n =this.storage.get('phone')
    //clearInterval(this.timer)
    /*this.timer=setInterval(()=>{
      if(this.information.user['alertMessage'][0]==undefined){
        this.h4.nativeElement.style.display="none";
      }
      else{
        this.h4.nativeElement.style.display="block";
        setTimeout(()=>{
          this.h4.nativeElement.style.display="none";
        },500)
      }
      n.then((data)=>{
        if(data!=null){
          $.ajax({
            url: 'http://112.74.184.215',
            type: 'POST',
            data: {'control':54,'userid':data},
            dataType: 'json',
            success:(res)=> {
              if(res[0]!=undefined){
                var date=new Date();
                var date1=Number(date);
                var h=date.getHours()
                var m=date.getMinutes();
                var s=date.getSeconds();
                var pin=(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s)
                var pin1=(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)
                for(var i=0;i<res.length;i++){
                  var data1=Number(new Date(res[i].creationtime))
                  if(date1>data1&&date1<data1+86400000*Number(res[i].Taking_cycle)){
                    res[i].times1 = res[i].times1=="00:00:00" ? "134" : res[i].times1
                    res[i].times2 = res[i].times2=="00:00:00" ? "134" : res[i].times2
                    res[i].times3 = res[i].times3=="00:00:00" ? "134" : res[i].times3
                    res[i].times4 = res[i].times4=="00:00:00" ? "134" : res[i].times4
                    res[i].times5 = res[i].times5=="00:00:00" ? "134" : res[i].times5
                    res[i].times6 = res[i].times6=="00:00:00" ? "134" : res[i].times6
                    res[i].times7 = res[i].times7=="00:00:00" ? "134" : res[i].times7
                    res[i].times8 = res[i].times8=="00:00:00" ? "134" : res[i].times8
                    res[i].times9 = res[i].times9=="00:00:00" ? "134" : res[i].times9
                    if(pin==res[i].times1||pin==res[i].times2||pin==res[i].times3||pin==res[i].times4||pin==res[i].times5||pin==res[i].times6||pin==res[i].times7||pin==res[i].times8||pin==res[i].times9){
                      this.localNotifications.schedule({
                        id:1,
                        title:"您的"+res[i].nickname+"用药时间到了",
                        text:res[i].drug+"\xa0"+"："+res[i].doses_quantity,
                        led:"#3BD065",
                        foreground: true,
                        sound: null,
                        lockscreen:true,
                        wakeup:true,
                        vibrate:true
                      })
                      this.information.user['alertMessage'].push({drug:res[i].drug,time:pin1,nickname:res[i].nickname})
                    }
                  }
                }
              }
            }
          })
        }
      })
    },1000)*/
    /*  关心的人吃药提醒  */
    /* 进入页面时获取文章类1对应的信息 */
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':20,'special_column_id':this.pet,'start':0,'num':5},
      dataType: 'json',
      success:(res)=> {
        for(var i=0;i<res.length;i++){
          var d =res[i].creationtime.slice(0,10)
          res[i].creationtime=d
        }
        this.data=res;
      }
    })
  }
  /* 获取被点击的文章分类的信息 */
  click(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':20,'special_column_id':this.pet,'start':0,'num':5},
      dataType: 'json',
      success:(res)=> {
        for(var i=0;i<res.length;i++){
          var d =res[i].creationtime.slice(0,10)
          res[i].creationtime=d
        }
        if(this.pet=="1"){
          this.data=res
        }else{
          this.data1=res;
        }
      }
    })
  }

  /* 文章下拉时加载 */
  doInfinite(infiniteScroll) {
    this.number+=2;
    setTimeout(() =>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':20,'special_column_id':this.pet,'start':5,'num':100},
        dataType: 'json',
        success:(res)=> {
          if(res.length!=0){
            for(var i=0;i<res.length;i++){
              var d =res[i].creationtime.slice(0,10)
              res[i].creationtime=d
            }
            this.data2=res;
          }
        }
      })
      infiniteScroll.complete();
    }, 500);
  }
  doInfinite1(infiniteScroll) {
    this.number+=2;
    setTimeout(() =>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':20,'special_column_id':this.pet,'start':5,'num':100},
        dataType: 'json',
        success:(res)=> {
          if(res.length!=0){
            for(var i=0;i<res.length;i++){
              var d =res[i].creationtime.slice(0,10)
              res[i].creationtime=d
            }
            this.data3=res;
          }
        }
      })
      infiniteScroll.complete();
    }, 500);
  }
  doInfinite2(infiniteScroll) {
    this.number+=2;
    setTimeout(() =>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':20,'special_column_id':this.pet,'start':5,'num':100},
        dataType: 'json',
        success:(res)=> {
          if(res.length!=0){
            for(var i=0;i<res.length;i++){
              var d =res[i].creationtime.slice(0,10)
              res[i].creationtime=d
            }
            this.data4=res;
          }
        }
      })
      infiniteScroll.complete();
    }, 500);
  }
  doInfinite3(infiniteScroll) {
    this.number+=2;
    setTimeout(() =>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':20,'special_column_id':this.pet,'start':5,'num':100},
        dataType: 'json',
        success:(res)=> {
          if(res.length!=0){
            for(var i=0;i<res.length;i++){
              var d =res[i].creationtime.slice(0,10)
              res[i].creationtime=d
            }
            this.data5=res;
          }
        }
      })
      infiniteScroll.complete();
    }, 500);
  }
  click1(id){
    variable.isSweep=false;
    this.nav.goPage(QrScannerPage,{detail8:this.indentify});
  }
  alert1(){
    if(this.information.user['switch']==="我是你"){
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
      this.nav.goPage(AllertPage)
    }
  }
  quick1(){
    if(this.information.user['switch']==="我是你"){
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
  ionViewDidLoad(){
    setInterval(()=>{
      if(this.information.user['switch']!="我是你"){
        let n = this.storage.get('phone')
        n.then((data) => {
          $.ajax({
            url: 'http://112.74.184.215',
            type: 'POST',
            data: {'control':63,'userid':data},
            dataType: 'json',
            success:(res)=> {
              if(res.message=="no"){
                this.h4.nativeElement.style.display="none";
              }else{
                this.information.user['messageAlert']=true
                this.h4.nativeElement.style.display="block";
                setTimeout(()=>{
                  this.h4.nativeElement.style.display="none";
                },500)
              }
            }
          })
        })
      }
    },1000)
  }
  alertlist(){
    let n = this.storage.get('phone')
    n.then((data) =>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':64,'userid':data},
        dataType: 'json',
        success:(res)=> {
          this.nav.goPage(DrugQrPage);
        }
      })
    })
  }
}

