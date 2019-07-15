import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
import {PagebuttonService} from "../service/pagebutton.service";

declare var $:any;
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  @ViewChild ("img1") img1;
  @ViewChild ("img2") img2;
  title;
  data3;
  numb;
  userid;
  record1;
  record2;
  record3;
  @ViewChild("mainBody") mainBody;
  easyLike:boolean=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private data:DataService,
              private nav:PagebuttonService,
              public alertCtrl: AlertController) {
  }
  /*  收藏  */
  favorit(){
    if(this.data.user["user_phone"]==""||this.data.user["switch"] ==="我是你"){
      const alert = this.alertCtrl.create({
        title: '你还未登录账号',
        cssClass:'projectList',
        buttons: ['OK']
      }).present();
    }else{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 40, 'article_id': this.title, 'userid': this.userid},
        dataType: 'json',
        success: (res) => {
          console.log(res,this.userid)
          if(res.length!=0){
            const alert = this.alertCtrl.create({
              title: '该文章已经被收藏',
              buttons: ['OK']
            }).present();
          }else {
            $.ajax({
              url: 'http://112.74.184.215',
              type: 'POST',
              data:{'control':19,'userid':this.userid,'article_id':this.title},
              dataType: 'json',
              success:(res)=> {
                this.img2.nativeElement.src="./assets/fonts/collect.png"
                const alert = this.alertCtrl.create({
                  title: '收藏成功',
                  buttons: ['OK']
                }).present();
              },
            })
          }
        }
      })
    }
  }
  /*  点赞 */
  sum(){
    if(this.data.user["user_phone"]==""||this.data.user["switch"] ==="我是你"){
      const alert = this.alertCtrl.create({
        title: '你还未登录账号',
        cssClass:'projectList',
        buttons: ['OK']
      }).present();
    }else{
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control': 61, 'article_id': this.title, 'userid': this.userid},
        dataType: 'json',
        success: (res) => {
          console.log(res)
          if(res.length!=0){
            const alert = this.alertCtrl.create({
              title: '你已经对该文章点过赞',
              cssClass:'projectList',
              buttons: ['OK']
            }).present();
          }else {
            $.ajax({
              url: 'http://112.74.184.215',
              type: 'POST',
              data:{'control':22,'userid':this.userid,'article_id':this.title},
              dataType: 'json',
              error:(err)=>{
                ++this.numb
                this.img1.nativeElement.src="./assets/fonts/give-a-like.png"
                const alert = this.alertCtrl.create({
                  title: '点赞成功',
                  cssClass:'projectList',
                  buttons: ['OK']
                }).present();
              }
            })
          }
        }
      })
    }
  }
  /*  文章详情 */
  ionViewDidLoad() {
    this.title=(this.navParams.get('title'))
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':21,'article_id':this.title},
      dataType: 'json',
      success:(res)=> {
        let creationtime = res[0].creationtime.slice(0,10)
        res[0].creationtime = creationtime
        this.data3=res;
        this.numb=this.data3[0].Help_number;
        this.mainBody.nativeElement.innerHTML=this.data3[0].content
      },
    })
    let b=this.storage.get('phone')
    b.then((data)=>{
      this.userid=data
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data:{'control':40,'article_id':this.title,'userid':data},
        dataType: 'json',
        success:(res)=> {
          console.log(this.img2.nativeElement)
          if(res.length!==0) {
            this.img2.nativeElement.src = "./assets/fonts/collect.png"
          }
        }
      })
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data:{'control':61,'article_id':this.title,'userid':this.userid},
        dataType: 'json',
        success:(res)=> {
          if(res.length!=0){
            this.img1.nativeElement.src = "./assets/fonts/give-a-like.png"
          }
        }
      })
    })
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}


