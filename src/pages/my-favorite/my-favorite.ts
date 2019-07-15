import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import {DetailPage} from "../detail/detail";
import { Storage } from '@ionic/storage';
declare var $:any;

/**
 * Generated class for the MyFavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-favorite',
  templateUrl: 'my-favorite.html',
})
export class MyFavoritePage {
  @ViewChild("shou") shou
  detail=DetailPage;
  userid;
  data6;                       /*  进入页面时获取的后台数据*/
  number;
  data3;                       /* 下拉刷新时获取的后台数据 */
  time3:any[]=[];              /*  进入页面时获取经计算得到的时间差值  */
  time4:any[]=[];              /*  下拉刷新时获取经计算得到的时间差值  */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private data:DataService,
              private nav:PagebuttonService,
              private alert:AlertController
  ) {
  }
  /*  进入页面时获取收藏后台数据 */
  ionViewDidLoad() {
    let c=this.storage.get('phone')
    c.then((data)=>{
      this.userid=data;
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data:{'control':18,'userid':this.userid},
        dataType: 'json',
        success:(res)=> {
          console.log(res)
          if(res.length==0){
            this.shou.nativeElement.style.display="block";
          }else{
            this.shou.nativeElement.style.display="none";
            this.data6=res;
            /*  循环后台传来的时间与当前时间做差值，将差值处理为天数，小时 */
            for(var i=0;i<res.length;i++){
              var now = new Date();
              var data =new Date(res[i].creationtime)
              var cha1=Number(now)-Number(data) ;
              var cha2=cha1/1000;
              var s=Math.floor(cha2);
              var h=Math.floor(s%(3600*24)/3600);
              var d=Math.floor(s/3600/24)
              if(d>0){
                this.time3.push(d+"天前");
              }else{
                this.time3.push(h+"小时前");
              }
            }
          }
        },
      })
    })
  }

  /*  下拉刷新时后台获取收藏数据据 */
  /*doInfinite(infiniteScroll) {
    this.number+=10;

    setTimeout(() => {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':18,'userid':this.data.user['userid']},
        dataType: 'json',
        success:(res)=> {
          this.data3=res;
          for(var i=0;i<res.length;i++){
            var now = new Date();
            var data =new Date(res[i].creationtime)
            var cha1=Number(now)-Number(data) ;
            var cha2=cha1/1000;
            var s=Math.floor(cha2);
            var h=Math.floor(s%(3600*24)/3600);
            var d=Math.floor(s/3600/24)
            if(d>0){
              this.time4.push(d+"天前");
            }else{
              this.time4.push(h+"小时前");
            }
          }
        }
      })
      infiniteScroll.complete();
    }, 500);
  }*/

  /*  删除文章事件  */
  delete($event){
    let lenght=$event.target.className.length
    var alarticle_id=$event.target.className.slice(0,lenght);
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
            let c=this.storage.get('phone')
            c.then((data)=>{
              $.ajax({
                url: 'http://112.74.184.215',
                type: 'POST',
                data: {'control':53,'userid':data,'article_id':alarticle_id},
                dataType: 'json',
                success:(res)=> {
                  $event.target.parentNode.parentNode.removeChild($event.target.parentNode);
                }
              })
            })
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
