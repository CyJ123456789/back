import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {ChatPage} from "../chat/chat";
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
import {isObject} from "ionic-angular/umd/util/util";
import {DrugQrPage} from "../drug-qr/drug-qr";
declare var $:any;

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  messageList;
  chat=ChatPage;
  @ViewChild("recode") recode;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private appCtrl:App,
              private storage:Storage) {
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']="缩小app"
    if(this.data.user["switch"] ==="我是你"){
      this.messageList=[]
    }else{
      let n = this.storage.get('phone')
      n.then((data) => {
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':57,'useridrx':data},
          dataType: 'json',
          success:(res)=> {
            if(res.length!=0){
              this.recode.nativeElement.style.display="none"
              console.log(res)
              for(var i=0;i<res.length;i++){
                if(res[i].content.indexOf("src")!=-1){
                  res[i].content="[图片]"
                }
              }
              this.messageList=res
            }
          },
        })
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':64,'userid':data},
          dataType: 'json',
          success:(res)=> {

          }
        })
      })
    }
  }

}
