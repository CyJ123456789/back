import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Content} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";
import {BigImgPage} from "../big-img/big-img";

declare var $:any;
declare let Swiper: any;

/**
 * Generated class for the InquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inquiry',
  templateUrl: 'inquiry.html',
})
export class InquiryPage {
  pet: string ="open-problem";
  question_id;
  content;
  userid;
  nickname;
  lenght;
  title;
  picture;
  picture2;
  picture3;
  timer;
  head_portrait;
  question;
  comment_list:any[] = [];
  commentContent;
  @ViewChild(Content) content1: Content;
  @ViewChild ("matter") matter;
  @ViewChild("placehold") placehold;
  @ViewChild('panel') panel;
  @ViewChild ("bigImg") bigImg
  swiper: any;
  vm: any = {
    canEdit: false,
    selectedIndex: 0,
    images: [],
    selectedCount: 0
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private storage:Storage,
              private data:DataService,
              private alert:AlertController) {
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content1.scrollToBottom();
    }, 100);
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
    var data2=(this.navParams.get('detail'))
    this.content=data2.content;
    this.nickname=data2.nickname;
    this.question=data2.question_id;
    this.head_portrait=data2.head_portrait
    this.title=data2.title;
    this.picture= data2.picture;
    this.picture2 = data2.picture2;
    this.picture3= data2.picture3;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control': 38, 'start':0,'num':100 },
      dataType: 'json',
      success: (res) => {
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':44,'question':this.question,'start':0,'num':20},
          dataType: 'json',
          success: (res) => {
            if(res.length==0){
              this.lenght=0
            }else {
              this.lenght=res.length;
            }
            for(var i=0;i<res.length;i++){
              var now = new Date();
              var data=new Date(res[i].datetime);
              var cha1=Number(now)-Number(data) ;
              var cha2=cha1/1000;
              var s=Math.floor(cha2);
              var h=Math.floor(s%(3600*24)/3600)
              var d=Math.floor(s/3600/24)
              if(d>0){
                res[i].datetime=d+"天前";
              }else{
                if(h==0){
                  res[i].datetime='刚刚';
                }else {
                  res[i].datetime=h+"小时前";
                }

              }
              /*var h=Math.floor(s%(3600*24)/3600)
              this.time.push(h);*/
            }
            this.comment_list=res;
            console.log(this.comment_list)
          }
        })
      }
    })
  }

  ionViewDidEnter(){
    this.timer = setInterval(()=>{
      let content =this.matter.nativeElement.innerHTML
      if(content==""){
        this.placehold.nativeElement.style.display="block"
      }else{
        this.placehold.nativeElement.style.display="none"
      }
    },600)
  }
  issue(){
    let b=this.storage.get('nickname')
    b.then((data)=>{
      let content =this.matter.nativeElement.innerHTML
      if(content==''){
        let alert = this.alert.create({
          title: "评论不能为空",
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
        console.log(this.data.user["switch"])
        if(this.data.user["user_name"]==="" || this.data.user["switch"] ==="我是你"){
          let alert = this.alert.create({
            title: "请在设置中先完善你的个人信息",
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
            data: {'control':43,'nickname':this.data.user['user_name'],'userid':this.userid,'content':content,'praise':'','id':'','question':this.question},
            dataType: 'text',
            success: (res) => {
              let alert = this.alert.create({
                title: "评论成功",
                buttons: [
                  {
                    text: '确定',
                    role: 'cancel',
                    handler: () => {
                      this.scrollToBottom();
                      this.matter.nativeElement.innerHTML=""
                    }
                  }
                ]
              }).present();
              this.comment_list.push({'head_portrait':this.data.user['imageda'],'nickname':this.data.user['user_name'],'datetime':'刚刚','content':content})
            }
          })
        }
      }
    })
  }
  ionViewDidLeave(){
    clearInterval(this.timer)
  }
  ionViewDidLoad() {
    //http://www.swiper.com.cn/api/index.html
    this.swiper = new Swiper(this.panel.nativeElement, {
      initialSlide: this.vm.selectedIndex,//初始化显示第几个
      zoom: true,//双击,手势缩放
      loop: false,//循环切换
      lazyLoading: true,//延迟加载
      lazyLoadingOnTransitionStart: true,//    lazyLoadingInPrevNext : true,
      pagination: '.swiper-pagination',//分页器
      paginationType: 'fraction',//分页器类型
      on:{
        slideChange: ()=>{
          if(this.swiper){
            let activeIndex = this.swiper.activeIndex;
            if(activeIndex < this.vm.images.length && activeIndex >= 0){
              this.vm.selectedIndex =  activeIndex;
            }
          }
        }
      }
    })
  }
  big($event){
    this.nav.goPage(BigImgPage,{src:$event.target.src})
  }

}
