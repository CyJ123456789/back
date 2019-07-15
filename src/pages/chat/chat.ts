import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content,AlertController} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
import {CameraOptions} from "@ionic-native/camera";
import {Camera} from "@ionic-native/camera";
import {BigImgPage} from "../big-img/big-img";

declare var $:any;
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  name;
  @ViewChild(Content) content: Content;
  pharmacist_id;
  messageList:any[] = [];
  messageContent;
  userid;
  bool;
  time;
  @ViewChild ("choess") choess
  @ViewChild ("bigImg") bigImg
  @ViewChild ("panel")  panel
  lastId:number;
  lastMessageId;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private camera:Camera,
              private alert:AlertController,
              private storage:Storage) {
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  ionViewDidLoad() {
    this.time=setInterval(()=>{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 51,'useridtx':this.pharmacist_id,'useridrx':this.userid,'listid':'0'},
        dataType: 'json',
        success: (res) => {
          console.log(res)
          if(res.length!=0){
            if(res[0].message_id!=this.lastMessageId&&this.lastMessageId!=undefined) {
              res[0].class = "left"
              this.messageList.push(res[0]);
              this.scrollToBottom();
            }
            this.lastMessageId=res[0].message_id
          }
        }
      })
      this.bool=true;
    },1000)
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    this.scrollToBottom();
    let n = this.storage.get('phone')
    n.then((data) => {
      this.userid=data
      var data2=(this.navParams.get('message'))
      var data3=(this.navParams.get('message1'))
      if(data2!=undefined){
        this.name=data2.name;
        this.pharmacist_id=data2.phone;
      }
      if(data3!=undefined){
        this.pharmacist_id=data3.useridtx;
        this.name=data3.name
      }
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 52,'useridtx':this.userid,'useridrx':this.pharmacist_id},
        success: (res) => {
          this.messageList=res;
          for(let i=0;i<res.length;i++){
            let year = res[i].datetime.slice(0,4)
            let mouth =res[i].datetime.slice(5,7)
            let day = res[i].datetime.slice(8,10)
            let time = res[i].datetime.slice(11)
            res[i].datetime = year+"/"+mouth+"/"+day+" "+time
            if(this.messageList[i].useridtx==this.userid){
              this.messageList[i].class="right"
            }else{
              this.messageList[i].class="left"
            }
          }
        }
      })
    })
  }

  ionViewDidLeave(){
    clearInterval(this.time)
  }


  issue(){
    if(this.data.user["user_name"]==""||this.data.user["switch"] ==="我是你"){
      let alert = this.alert.create({
        title: "你还未登录账号或完善个人信息",
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
      let img = `<img src=\\'http://112.74.184.215/./20190129/25220_114251_8804.png\\' width=\\'100px\\' height=\\'100px\\'>`
      if(this.messageContent!=undefined&&this.messageContent!=""){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control': 50,'useridtx':this.userid,'useridrx':this.pharmacist_id,"contens":this.messageContent},
          dataType: 'json',
          success: (res) => {
            console.log("我是真的喜欢你")
          },
          error:(err)=>{
            console.log("天地良心可见")
          }
        })
        this.messageList.push({"content":this.messageContent,"class":"right"})
        this.scrollToBottom();
        this.messageContent=""
      }
    }
  }
  selectImg(){
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
    this.camera.getPicture(options).then((imageData) => {
      var image= 'data:image/jpeg;base64,' + imageData;
      this.choess.nativeElement.style.display="none"
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 56, 'image': image},
        dataType: 'json',
        success: (res) => {
          $.ajax({
            url: 'http://112.74.184.215',
            type: 'POST',
            data: {'control': 50,'useridtx':this.userid,'useridrx':this.pharmacist_id,'contens':`<img src=\\'${res.image}\\' width=\\'100px\\' height=\\'100px\\'>`},
            dataType: 'json',
            success: (resb) => {
              this.messageList.push({"content":`<img src='${res.image}' width='100px' height='100px'>`,"class":"right"})
              this.scrollToBottom();
            },
          })
        }
      })
    }, (err) => {
      console.log('获取图片失败');
    });
  }
  photograph1(){
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
    this.camera.getPicture(options).then((imageData) => {
      var image= 'data:image/jpeg;base64,' + imageData;
      this.choess.nativeElement.style.display="none"
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 56, 'image': image},
        dataType: 'json',
        success: (res) => {
          $.ajax({
            url: 'http://112.74.184.215',
            type: 'POST',
            data: {'control': 50,'useridtx':this.userid,'useridrx':this.pharmacist_id,'contens':`<img src=\\'${res.image}\\' width=\\'100px\\' height=\\'100px\\'>`},
            dataType: 'json',
            success: (resb) => {
              this.messageList.push({"content":`<img src='${res.image}' width='100px' height='100px'>`,"class":"right"})
              this.scrollToBottom();
            },
          })
        }
      })
    }, (err) => {
      console.log('获取图片失败');
    });
  }
  show1(){
    this.choess.nativeElement.style.display = "block"
  }
  blow($event){
    if($event.target.tagName.toLocaleLowerCase()=='img'){
      this.nav.goPage(BigImgPage,{src:$event.target.src})
    }
  }
  hidden(){
    this.panel.nativeElement.style.display = "none"
  }
}
