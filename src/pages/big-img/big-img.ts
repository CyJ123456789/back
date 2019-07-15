import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";

/**
 * Generated class for the BigImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-big-img',
  templateUrl: 'big-img.html',
})
export class BigImgPage {
  @ViewChild("bigImg") bigImg
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    let src = this.navParams.get('src')
    console.log(src)
    this.bigImg.nativeElement.src=src
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
