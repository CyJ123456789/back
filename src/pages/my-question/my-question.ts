import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import {BigImgPage} from "../big-img/big-img";

declare var $:any;

/**
 * Generated class for the MyQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-question',
  templateUrl: 'my-question.html',
})
export class MyQuestionPage {
  content;
  question_id;
  lenght;
  picture;
  picture2;
  picture3;
  title;
  time;
  comment_list:any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }

  ionViewDidLoad() {
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    var data2=(this.navParams.get('detail'))
    this.content=data2.content;
    this.title=data2.title;
    this.time=data2.datetime
    this.picture=data2.picture
    this.picture2=data2.picture2
    this.picture3=data2.picture3
    console.log(this.title)
    this.question_id=data2.question_id;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':44,'question':this.question_id,'start':0,'num':20},
      dataType: 'json',
      success: (res) => {
        if(res.length==0){
          this.lenght=0
        }else {
          this.lenght=res.length;
        }
        for(var i=0;i<res.length;i++){
          var now = new Date();
          var data=new Date(res[i].datetime);
          var cha1=Number(now)-Number(data) ;
          var cha2=cha1/1000;
          var s=Math.floor(cha2);
          var h=Math.floor(s%(3600*24)/3600)
          var d=Math.floor(s/3600/24)
          if(d>0){
            res[i].datetime=d+"天前";
          }else{
            if(h==0){
              res[i].datetime='刚刚';
            }else {
              res[i].datetime=h+"小时前";
            }
          }
        }
        this.comment_list=res;
      }
    })
  }

  big($event){
    this.nav.goPage(BigImgPage,{src:$event.target.src})
  }
}
