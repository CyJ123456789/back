import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {RegistPage} from "../regist/regist";
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';

declare var $:any;

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  phone;       /* 输入的手机号 */
  @ViewChild("p3") p3;   /* 手机号对应的p元素 */
  code;        /*  输入的验证码 */
  @ViewChild("p4") p4;   /* 验证码对应的p元素 */
  @ViewChild("btn") button;
  @ViewChild('clavier') clavier
  code1;                 /*  从后台获取的验证码 */
  regist=RegistPage;     /*  注册页面 */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public navservice:PagebuttonService,
              private alert:AlertController,
              private storage:Storage,
              private data:DataService) {
  }
  verified(){

    var time2=this.button;
    if(this.phone==undefined||this.phone==""){

    }else {
      if(time2.nativeElement.innerHTML=="获取验证码"){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'GET',
          data: {'check':1,'phone':this.phone},
          dataType: 'json',
          success:(res)=> {
            console.log(res)
            if (res.length==2) {
              this.p3.nativeElement.style.display = "block";
              this.p3.nativeElement.innerHTML="该手机号不存在"
            }else{
              this.code1=res[0].code;
              var h=60;
              time2.nativeElement.innerHTML="60s"
              var time1=setInterval(function () {
                h-=1;
                time2.nativeElement.innerHTML=h+"s";
                if(h<1){
                  clearInterval(time1);
                  time2.nativeElement.innerHTML="获取验证码";
                }
              },1000)
            }
          }
        })
      }
    }
  }
  /*  当手机输入框获取焦点时触发的事件  */
  phonefocus(){
    this.p3.nativeElement.style.display = "none";
  }
  /*  验证码输入框获取焦点时触发的事件 */
  codefocud(){
    this.p4.nativeElement.style.display = "none";
  }
  /* 登录时触发的事件 */
  login(){
    if(this.phone==undefined||this.code==undefined){
      let alert = this.alert.create({
        title: "手机号不能为空",
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
    }else if(this.code!=this.code1){
      this.p4.nativeElement.style.display="block";
    }else {
      this.data.user['userid']=this.phone
      this.storage.set("phone",this.data.user['userid'])
      let alert = this.alert.create({
        title: "登录成功",
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              $.ajax({
                url: 'http://112.74.184.215',
                type: 'POST',
                data: {'control': 35, 'userid': this.phone,'one':false},
                dataType: 'json',
                success: (res) => {
                  $.ajax({
                    url: 'http://112.74.184.215',
                    type: 'POST',
                    data: {'control': 2, 'userid': this.phone},
                    dataType: 'json',
                    success: (res) => {
                      this.data.user['switch']="你是我"
                      this.data.user["imageda"]=res[0].head_portrait;
                      this.data.user["user_name"]=res[0].nickname;
                      this.data.user['user_phone']=res[0].userid;
                      this.navservice.backPage();
                      this.navservice.slected(0);
                    }
                  })
                }
              })
            }
          }
        ]
      }).present();
    }
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
