import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Platform} from 'ionic-angular';
import {MyPhysicianVisitsPage} from "../my-physician-visits/my-physician-visits";
import {PagebuttonService} from "../service/pagebutton.service";
import {CareAboutPage} from "../care-about/care-about";
import {AlerganPage} from "../alergan/alergan";
import {MyFavoritePage} from "../my-favorite/my-favorite";
import {MedicalHistoryPage} from "../medical-history/medical-history";
import {RegistPage} from "../regist/regist";
import {LoginPage} from "../login/login";
import {PersonelPage} from "../personel/personel";
import {AllertPage} from "../allert/allert";
import {ViewChild} from "@angular/core";
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import {DoctorAdvicePage} from "../doctor-advice/doctor-advice";
import {FeedbackPage} from "../feedback/feedback";
import {OurPage} from "../our/our";
import {YiZhuPage} from "../yi-zhu/yi-zhu";

declare var $:any;

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  ourPage = OurPage
  @ViewChild("setting") setting;
  myphysicianvisits=MyPhysicianVisitsPage;
  careabout=CareAboutPage;
  login2=LoginPage;
  alergan=AlerganPage;
  myfavorite=MyFavoritePage;
  medicalhistory=MedicalHistoryPage
  regist=RegistPage;
  feedback = FeedbackPage
  alert2=AllertPage;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  user_img;
  audio: MediaObject;
  audioList: any[] = [];
  listData:any[]=[];
  yizhu=YiZhuPage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav3:PagebuttonService,
              private alert:AlertController,
              private data:DataService,
              private storage:Storage,
              private media: Media,
              private file:File,
              private platform:Platform) {
  }
  hypocoristic;
  hide:boolean=true;
  /*  进入该界面时获取用户状态 */
  ionViewWillEnter(){
    this.data.user['biaoshi']="缩小app"
    let n=this.storage.get('phone')
    n.then((data)=> {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 36, 'userid': data},
        dataType: 'json',
        success: (res) => {
          if(res[0].one=="false"){
            this.setting.nativeElement.style.marginLeft="73%"
            this.hide=false
          }else{
            this.hide=true;
            this.setting.nativeElement.style.marginLeft="30%"
          }
        }
      })
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 2, 'userid': data},
        dataType: 'json',
        success: (res) => {
          this.hypocoristic=res[0].nickname;
        }
      })
    })
  }

  /* 点击透明膜时触发的事件 */
  alert1(){
    let alert = this.alert.create({
      title: "您还未登录账号",
      buttons: [
        {
          text: '确定',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).present();
  }

  /* 点击设置按钮触发的事件 */
  gosetting(){
    if(this.hide==true){
      let alert = this.alert.create({
        title: "您还未登录账号",
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
      this.nav3.goPage(PersonelPage);
    }
  }
}
