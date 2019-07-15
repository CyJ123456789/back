import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";

/**
 * Generated class for the TextYiZhuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-text-yi-zhu',
  templateUrl: 'text-yi-zhu.html',
})
export class TextYiZhuPage {
  @ViewChild ("content") content
  @ViewChild ("compile") compile
  textYiZhuList: any[] = []
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private data:DataService,
              private alert:AlertController,
              private nav:PagebuttonService) {
  }

  showInput(){
    this.content.nativeElement.style.display = "block"
    this.compile.nativeElement.style.display = "none"
  }
  submit(){
    if(this.content.nativeElement.innerHTML==""){
      let alert = this.alert.create({
        title: "输入内容不能为空",
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
      this.textYiZhuList.push(this.content.nativeElement.innerHTML)
      this.compile.nativeElement.style.display = "block"
      this.content.nativeElement.style.display = "none"
      this.content.nativeElement.innerHTML=""
      this.storage.set("contentList",this.textYiZhuList)
    }
  }

  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    let n = this.storage.get('contentList')
    n.then((data)=>{
      if(data!=null){
        this.textYiZhuList=data
      }
    })
  }
  zhenNan(i){
    this.textYiZhuList.splice(i,1)
    this.storage.set("contentList",this.textYiZhuList)
  }
}
