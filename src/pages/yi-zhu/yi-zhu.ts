import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {TextYiZhuPage} from "../text-yi-zhu/text-yi-zhu";
import {DoctorAdvicePage} from "../doctor-advice/doctor-advice";
import {PictureYiZhuPage} from "../picture-yi-zhu/picture-yi-zhu";
import {DataService} from "../service/data.service";

/**
 * Generated class for the YiZhuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yi-zhu',
  templateUrl: 'yi-zhu.html',
})
export class YiZhuPage {
  text=TextYiZhuPage;
  picture = PictureYiZhuPage
  doctor = DoctorAdvicePage
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }

  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
  }
}
