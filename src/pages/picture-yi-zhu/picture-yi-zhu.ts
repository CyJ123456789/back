import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Storage} from "@ionic/storage";
import {DataService} from "../service/data.service";

/**
 * Generated class for the PictureYiZhuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picture-yi-zhu',
  templateUrl: 'picture-yi-zhu.html',
})
export class PictureYiZhuPage {
  imgList:any[]=[]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera:Camera,
              private data:DataService,
              private storage:Storage,
              private nav:PagebuttonService) {
  }

  photograph(){
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
      this.imgList.push(image)
      this.storage.set("imageList",this.imgList)
    }, (err) => {
      console.log('获取图片失败');
    });
  }
  locality(){
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
      this.imgList.push(image)
      this.storage.set("imageList",this.imgList)
    }, (err) => {
      console.log('获取图片失败');
    });
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    let n = this.storage.get('imageList')
    n.then((data)=>{
      if(data!=null){
        this.imgList=data
      }
    })
  }

  zhenNan(i){
    this.imgList.splice(i,1)
    this.storage.set("imageList",this.imgList)
  }

}
