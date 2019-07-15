import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {AllertDetailPage} from "../allert-detail/allert-detail";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";

declare var $:any;
/**
 * Generated class for the DrugNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drug-name',
  templateUrl: 'drug-name.html',
})
export class DrugNamePage {
  concernid;
  guardainid;
  nickName;
  list:any[] = [];
  allertDetail=AllertDetailPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private nav:PagebuttonService,
              private storage:Storage,
              private data:DataService,
              private alert:AlertController) {
  }

  ionViewWillEnter() {
    this.data.user['biaoshi']=''
    /*  接受用药提醒传过来的数据 */
    var data1=(this.navParams.get('allertDetail'))
    this.guardainid=data1.concern_id;
    this.nickName=data1.nickname;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':3, 'concernid':this.guardainid},
      dataType: 'json',
      success: (res) => {
        console.log(res)
        if(res!=undefined){
          for(var i=res.length-1;i>=0;i--){
            /*let time1=Number(new Date(res[i].creationtime))
            let time2=Number(new Date())
            let time3=86400000*Number(res[i].Taking_cycle)
            let time4=time3-(time2-time1)
            if(time4<=0){
              res.splice(i,1)
            }*/
            if(res[i].day=="0"){
              res.splice(i,1)
            }
          }
        }
        this.list=res;
        for(var k=0;k<this.list.length;k++){
          this.list[k].times1=this.list[k].times1.slice(0,5)
          this.list[k].times2=this.list[k].times2.slice(0,5)
          this.list[k].times3=this.list[k].times3.slice(0,5)
          this.list[k].times4=this.list[k].times4.slice(0,5)
          this.list[k].times5=this.list[k].times5.slice(0,5)
          this.list[k].times6=this.list[k].times6.slice(0,5)
          this.list[k].times7=this.list[k].times7.slice(0,5)
          this.list[k].times8=this.list[k].times8.slice(0,5)
          this.list[k].times9=this.list[k].times9.slice(0,5)
        }
      },
    })
  }
  delete($event){
    var drugid=$event.target.className;
    const confirm = this.alert.create({
      title: '是否将该用药从列表中删除？',
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
            $.ajax({
              url: 'http://112.74.184.215',
              type: 'POST',
              data: {'control':32, 'takemedicineid':drugid},
              dataType: 'json',
              success: (res) => {
                console.log($event.target.parentNode.parentNode.parentNode)
                $event.target.parentNode.parentNode.parentNode.removeChild($event.target.parentNode.parentNode)
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
