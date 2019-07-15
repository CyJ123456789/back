import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,ActionSheetController} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
import {stringify} from 'qs';
declare var $:any;

/**
 * Generated class for the PersonelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personel',
  templateUrl: 'personel.html',
})
export class PersonelPage {
  path: string;
  access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpLXJlc291cmNlIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwiZXhwIjoxNTA5MTk2OTcyLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOWFmYmIyYWItMzdiYi00MTIyLTg2NDAtY2FmMDc1OTRmOGZkIiwiY2xpZW50X2lkIjoiY2xpZW50MiJ9.bJOpK0UjCI1ym32uerR_jKp4pv8aLaOxnTeK_DBjYZU';
  phone;                                     /* 用户名手机号 */
  hypocoristic;                             /* 用户昵称 */
  newLeave;                                  /* 用户生日 */
  gender;                                    /* 用户性别 */
  marriage;                                  /* 用户婚姻状况 */
  user_img;
  duiBi_img;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private navservice:PagebuttonService,
              private alert:AlertController,
              public actionSheetCtrl: ActionSheetController,
              private data:DataService,
              private storage: Storage,
              private camera:Camera) {
  }

  nickname1(){
    let prompt = this.alert.create({
      title: '请输入用户昵称',
      inputs: [
        {
          name: 'title',
          placeholder: '昵称'
        },
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.hypocoristic=data.title;
          }
        }
      ]
    });
    prompt.present();
  }
  gender1(){
    let alert = this.alert.create();
    alert.setTitle('请做选择');
    alert.addInput({
      type: 'radio',
      label: '男',
      value: '男',
    });

    alert.addInput({
      type: 'radio',
      label: '女',
      value: '女'
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        this.gender=data;
      }
    });

    alert.present().then(() => {
    });
  }

  /*  头像选取 */
  openActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '从相册选择',
          cssClass: 'zm-action-button',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              sourceType: 0,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType:0,
              mediaType: 0,
              correctOrientation: true,
              targetWidth:450,
              targetHeight: 350,
            }
            this.camera.getPicture(options).then((imageData) => {
              this.user_img= 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
              console.log('获取图片失败');
            });
          }
        },
        {
          text: '拍照',
          cssClass: 'zm-action-button',
          handler: () => {
            /*  拍照获取图片“CAMERA” */
            const options: CameraOptions = {
              quality: 100,
              sourceType: 1,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: 0,
              mediaType:0,
              correctOrientation: true,
              targetWidth:150,
              targetHeight:150,
            }
            this.camera.getPicture(options).then((imageData) => {
              this.user_img= 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
              console.log('获取图片失败');
              this.storage.get('img',)
            });
          }
        },
        {
          text: '取消',
          cssClass: 'zm-action-button',
        }
      ]
    }).present()
  }
  /*  提交个人信息 */
  submit(){
    if(this.newLeave==''||this.phone==''||this.hypocoristic==''||this.gender==undefined){
      let alert = this.alert.create({
        title: "请完善个人信息",
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
      if(this.user_img==this.duiBi_img){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':27,'userid':this.phone,'nickname':this.hypocoristic,'head_portrait':'','gender':this.gender,'birthday':this.newLeave,'olduserid':this.phone},
          dataType: 'text',
          success:(res)=> {
            console.log(this.phone)
            console.log(this.hypocoristic,this.newLeave,this.gender)
            let alert = this.alert.create({
              title: "提交成功",
              buttons: [
                {
                  text: '确定',
                  role: 'cancel',
                  handler: () => {
                    this.navservice.backPage();
                    this.data.user["user_name"]=this.hypocoristic;
                  }
                }
              ]
            }).present();
          }
        })
      }else{
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control': 56,'image':this.user_img},
          dataType: 'json',
          success: (res) => {
            this.data.user["imageda"]=res.image;
            $.ajax({
              url: 'http://112.74.184.215',
              type: 'POST',
              data: {'control':27,'userid':this.phone,'nickname':this.hypocoristic,'head_portrait':res.image,'gender':this.gender,'birthday':this.newLeave,'olduserid':this.phone},
              dataType: 'text',
              success:(res)=> {
                console.log(this.phone)
                console.log(this.hypocoristic,this.newLeave,this.gender)
                let alert = this.alert.create({
                  title: "提交成功",
                  buttons: [
                    {
                      text: '确定',
                      role: 'cancel',
                      handler: () => {
                        this.navservice.backPage();
                        this.data.user["user_name"]=this.hypocoristic;
                      }
                    }
                  ]
                }).present();
              }
            })
          },
        })
      }
    }
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    /*  获取用户信息 */
    let n=this.storage.get('phone')
    n.then((data)=> {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 2, 'userid': data},
        dataType: 'json',
        success: (res) => {
          this.hypocoristic=res[0].nickname
          this.phone=res[0].userid;
          this.gender=res[0].gender;
          this.newLeave=res[0].birthday;
          this.user_img=res[0].head_portrait;
          this.duiBi_img=res[0].head_portrait;
        }
      })
    })
  }

  /* 退出登录 */
  quit(){
    this.data.user['imageda']="../assets/imgs/1.jpg";
    this.storage.set('img',this.data.user['imageda'])
    let n=this.storage.get('phone')
    n.then((data)=> {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 35, 'userid': this.phone,'one':true},
        dataType: 'json',
        success: (res) => {
          this.data.user['userid']="";
          this.data.user['user_name']="";
          this.data.user['user_phone']="";
          this.data.user['switch']="0"
          this.data.user["switch"] ="我是你"
          this.navservice.backPage();
          this.navservice.slected(0);
        }
      })
    })
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}


