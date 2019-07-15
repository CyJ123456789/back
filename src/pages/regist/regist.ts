import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {Keyboard} from "ionic-angular";
import {AlertController} from "ionic-angular";
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";

declare var $:any;
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})
export class RegistPage {
  phone;       /* 输入的手机号 */
  @ViewChild("p3") p3;   /* 手机号对应的p元素 */
  code;        /*  输入的验证码 */
  @ViewChild("p4") p4    /* 验证码对应的p元素 */
  @ViewChild("btn") button
  @ViewChild('clavier') clavier
  code1;                 /*  从后台获取的验证码 */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private alert:AlertController,
              private keyboard:Keyboard,
              private data:DataService,
              private storage:Storage) {
  }
  /*  点击获取验证码按钮时判断手机号格式是否正确和该手机号是否被注册过 */
  verified(){
    let reg=/^1[34578]\d{9}$/
    if(this.phone==undefined||this.phone==""){

    }else{
      if(reg.test(this.phone)){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'GET',
          data: {'check':1,'phone':this.phone},
          dataType: 'json',
          success:(res)=> {
            console.log(res)
            if (res.length==1) {
              this.p3.nativeElement.style.display = "block";
              this.p3.nativeElement.innerHTML="该手机号已经被注册过"
            }else{
              this.code1=res[1].code
              var h=60;
              var time2=this.button;
              time2.nativeElement.innerHTML="60s";
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
      }else {
        this.p3.nativeElement.style.display="block"
      }
    }
  }
  /*  当手机输入框获取焦点时触发的事件 */
  phonefocus(){
    this.p3.nativeElement.style.display = "none";
  }
  /*  验证码输入框获取焦点时触发的事件 */
  codefocud(){
    this.p4.nativeElement.style.display = "none";
  }
  /* 注册用户 */
  regist(){
    if(this.phone==undefined){
      let alert = this.alert.create({
        title: "手机号不能为空",
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
    }
    else{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':26,'userid':this.phone},
        dataType: 'text',
        success:(res)=> {
          let alert = this.alert.create({
            title: "注册成功",
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
    }
  }
  ionViewDidLoad(){
    /*window.addEventListener('native.keyboardshow',(e:any) =>{
      this.clavier.nativeElement.style.marginTop=200+e.keyboardHeight+"px";
    });
    window.addEventListener("native.keyboardhide",()=>{
      this.clavier.nativeElement.style.marginTop=200+"px"
    })*/
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
