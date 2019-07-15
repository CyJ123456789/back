import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the NimabiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nimabi',
  templateUrl: 'nimabi.html',
})
export class NimabiPage {
  id;
  userid;
  blood;
  guomin;
  user;
  birth1;
  hypocoristic;                             /* 用户昵称 */
  newLeave;                                  /* 用户生日 */
  gender;                                    /* 用户性别 */
  marriage;                                  /* 用户婚姻状况 */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private alert:AlertController,
              private data:DataService,
              private storage:Storage) {
  }

  /*  生日输入 */
  性别选择
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
  xuexing(){
    let alert = this.alert.create();
    alert.setTitle('请做选择');
    alert.addInput({
      type: 'radio',
      label: 'A',
      value: 'A',
    });

    alert.addInput({
      type: 'radio',
      label: 'B',
      value: 'B'
    });
    alert.addInput({
      type: 'radio',
      label: 'AB',
      value: 'AB'
    });
    alert.addInput({
      type: 'radio',
      label: 'O',
      value: 'O'
    });
    alert.addInput({
      type: 'radio',
      label: '其它',
      value: '其它'
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        this.blood=data;
      }
    });

    alert.present().then(() => {
    });
  }
  guomin1(){
    let prompt = this.alert.create({
      title: '过敏原',
      inputs: [
        {
          value:this.guomin,
          name: 'title',
          placeholder: '请输入过敏原'
        },
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.guomin =data.title;
          }
        }
      ]
    });
    prompt.present();
  }
  submit(){
    if(this.data.user["switch"] ==="我是你"){
      let alert = this.alert.create({
        title: "你还未登录账号",
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
      if(this.gender==undefined||this.blood==undefined||this.guomin==undefined||this.guomin==""||this.birth1==undefined){
        let alert = this.alert.create({
          title: "请完善信息后再提交",
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
      }else if(this.userid==undefined){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':28,'userid':this.user,'nickname':this.id,'gender':this.gender,'birthday':this.birth1,'blood':this.blood,'allergen':this.guomin,'isno':'否',},
          dataType: 'json',
          success: (res) => {
            let alert = this.alert.create({
              title: "提交成功",
              buttons: [
                {
                  text: '确定',
                  role: 'cancel',
                  handler: () => {
                    this.nav.backPage();
                  }
                }
              ]
            }).present();
          }
        })
      }else{
        let n = this.storage.get('phone')
        n.then((data) => {
          $.ajax({
            url: 'http://112.74.184.215',
            type: 'POST',
            data: {'control':29,'nickname':this.id,'gender':this.gender,'birthday':this.birth1,'blood':this.blood,'allergen':this.guomin,'isno':'否','concernid':this.userid},
            dataType: 'json',
            success: (res) => {
              let alert = this.alert.create({
                title: "修改成功",
                buttons: [
                  {
                    text: '确定',
                    role: 'cancel',
                    handler: () => {
                      this.nav.backPage();
                    }
                  }
                ]
              }).present();
            }
          })
        })
      }
    }
    /*if(this.id==undefined||this.gender==undefined||this.birth1==undefined||this.blood==undefined){
      let alert = this.alert.create({
        title: "请完善监护人信息",
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      }).present();
    }else if(this.userid==undefined||this.userid==""){
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':28,'userid':this.user,'nickname':this.id,'gender':this.gender,'birthday':this.birth1,'blood':this.blood,'allergen':this.guomin,'isno':'否',},
        dataType: 'json',
        success: (res) => {
          let alert = this.alert.create({
            title: "提交成功",
            buttons: [
              {
                text: '确定',
                role: 'cancel',
                handler: () => {
                  this.nav.backPage();
                }
              }
            ]
          }).present();
        }
      })
    }else {

    }*/

  }
  ionViewWillEnter() {
    this.data.user['biaoshi']=""
    let c=this.storage.get('phone')
    c.then((data)=>{
      this.user=data;
    })
    var data1=(this.navParams.get('nimabi1'))
    this.id=data1;
    var data2=(this.navParams.get('nimabi'))
    if(data2!=undefined){
      this.id=data2.nickname;
      this.userid=data2.concern_id;
      this.guomin=data2.allergen;
      this.birth1=data2.birthday;
      this.gender=data2.gender;
      this.blood=data2.blood;
    }
  }

}
