import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import {InquiryPage} from "../inquiry/inquiry";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
declare var $:any;
/**
 * Generated class for the QuickQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quick-question',
  templateUrl: 'quick-question.html',

})
export class QuickQuestionPage {
  @ViewChild('p1') p;
  userid;
  headline;
  pickList:any[] = []

  health_Said;
  @ViewChild("content") content;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private storage:Storage,
              private camera:Camera,
              private alert:AlertController) {
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    let n=this.storage.get('phone');
    n.then((data)=> {
      this.userid=data;
    })
  }
  hide1(){
    this.p.nativeElement.style.display="none";
  }

  submit1(){
    var content=this.content.nativeElement.innerHTML;
    console.log(content)
    let n=this.storage.get('nickname');
    n.then((data)=> {
      if(content==undefined||content==''||this.headline==undefined){
        let alert = this.alert.create({
          title: "请完善提问信息",
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
      }else if(content.length<10){
        let alert = this.alert.create({
          title: "你的提问字数不够",
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
      } else {
        console.log(this.data.user['user_name'])
        if(this.data.user['user_name']==""||this.data.user["switch"] ==="我是你"){
          let alert = this.alert.create({
            title: "请在设置中完善你的个人信息",
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
          $.ajax({
            url: 'http://112.74.184.215',
            type: 'POST',
            data: {'control':37,'userid':this.userid,"picture":this.pickList[0],"picture2":this.pickList[1],"picture3":this.pickList[2],'title':this.headline,'nickname':this.data.user['user_name'],'content':content},
            dataType: 'json',
            success:(res)=> {
              let alert = this.alert.create({
                title: "您已成功提交问题",
                cssClass:'projectList',
                buttons: [
                  {
                    text: '确定',
                    role: 'cancel',
                    handler: () => {
                      console.log(data)
                      this.nav.backPage()
                    }
                  }
                ]
              }).present();
            }
          })
        }
      }
    })
  }
  addPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:1,
      allowEdit:false,
      encodingType:this.camera.EncodingType.JPEG,
      saveToPhotoAlbum:true,
      correctOrientation: true,
      mediaType:this.camera.MediaType.PICTURE,
      targetWidth:720,
      targetHeight: 1280,
    }
    if(this.pickList.length<3){
      this.camera.getPicture(options).then((imageData) => {
        var image= 'data:image/jpeg;base64,' + imageData;
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control': 56, 'image': image},
          dataType: 'json',
          success: (res) => {
            this.pickList.push(res.image)
          }
        })
      }, (err) => {
        console.log('获取图片失败');
      });
    }
  }
  addPicture1(){
    const options: CameraOptions = {
      quality: 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:0,
      allowEdit:false,
      encodingType:this.camera.EncodingType.JPEG,
      saveToPhotoAlbum:true,
      correctOrientation: true,
      mediaType:this.camera.MediaType.PICTURE,
      targetWidth:720,
      targetHeight: 1280,
    }
    if(this.pickList.length<3){
      this.camera.getPicture(options).then((imageData) => {
        var image= 'data:image/jpeg;base64,' + imageData;
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control': 56, 'image': image},
          dataType: 'json',
          success: (res) => {
            this.pickList.push(res.image)
          }
        })
      }, (err) => {
        console.log('获取图片失败');
      });
    }
  }
}
