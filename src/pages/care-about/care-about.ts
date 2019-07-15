import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {NimabiPage} from "../nimabi/nimabi";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the CareAboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-about',
  templateUrl: 'care-about.html',
})
export class CareAboutPage {
  kinsfolk:any[] = []                     /*  关心的人的列表 */
  detail=NimabiPage;
  userid;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alert:AlertController,
              private nav:PagebuttonService,
              private data:DataService,
              private storage:Storage) {
  }

  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  about(){
    let prompt = this.alert.create({
      title: '请输入将要关心的人',
      inputs: [
        {
          name: 'title',
          placeholder: '亲属关系'
        },
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            if(data.title==undefined||data.title==''){
              let alert = this.alert.create({
                title: "输入不能为空",
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
              this.nav.goPage(NimabiPage,{nimabi1:data.title});
            }
          }
        }
      ]
    });
    prompt.present();
  }
  /*   */
  ionViewWillEnter() {
    this.data.user['biaoshi']=""
    let n = this.storage.get('phone')
    n.then((data) => {
      this.userid=data;
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 1, 'userid': data,},
        dataType: 'json',
        success: (res) => {
          this.kinsfolk=res;
        }
      })
    })
  }
  /*  删除关心的人 */
  delete($event){
    var target=$event.target.className;
    const confirm = this.alert.create({
      title: '是否将该关心的人从列表中删除？',
      cssClass:'projectList',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            let n = this.storage.get('phone')
            n.then((data) => {
              $.ajax({
                url: 'http://112.74.184.215',
                type: 'POST',
                data: {'control': 9, 'concernid': target},
                dataType: 'json',
                success: (res) => {
                  $event.target.parentNode.parentNode.removeChild($event.target.parentNode)
                }
              })
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
