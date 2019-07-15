import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the AlerganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alergan',
  templateUrl: 'alergan.html',
})
export class AlerganPage {
  kinsfolk:any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private data:DataService,
              private nav:PagebuttonService) {
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    let n = this.storage.get('phone')
    n.then((data) => {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':1,'userid':data},
        dataType: 'json',
        success: (res) => {
          this.kinsfolk=res;
          for(var i=0;i<this.kinsfolk.length;i++){
            if(this.kinsfolk[i].allergen==undefined||this.kinsfolk[i].allergen==""){
              this.kinsfolk[i].allergen="暂无添加过敏源"
            }
          }
        }
      })
    })
  }
}
