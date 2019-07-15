import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import {Storage} from "@ionic/storage";

declare var $:any;
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  @ViewChild("placehold") placehold;
  @ViewChild("content") content;
  timer;
  email;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private alert:AlertController,
              private storage:Storage) {
  }
  ionViewDidLoad() {
    this.timer=setInterval(()=>{
      let text = this.content.nativeElement.innerHTML
      if(text==""){
        this.placehold.nativeElement.style.display="block";
      }else{
        this.placehold.nativeElement.style.display="none";
      }
    },600)
  }
  ionViewWillLeave(){
    clearInterval(this.timer)
    this.data.user['biaoshi']="缩小app"
  }
  submit(){
    let text = this.content.nativeElement.innerHTML

    let n=this.storage.get('phone');
    if(text==""){
      let alert = this.alert.create({
        title: "提交信息不能为空",
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
    }else{
      n.then((data)=> {
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':5,'userid':data,'questions':text,'email':this.email},
          dataType: 'json',
          success:(res)=> {
            let alert = this.alert.create({
              title: "提交成功",
              cssClass:'projectList',
              buttons: [
                {
                  text: '确定',
                  role: 'cancel',
                  handler: () => {
                    this.nav.backPage()
                  }
                }
              ]
            }).present();
          }
        })
      })
    }
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
  }
}
