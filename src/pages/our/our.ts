import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";

/**
 * Generated class for the OurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-our',
  templateUrl: 'our.html',
})
export class OurPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private navservice:PagebuttonService
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OurPage');
  }

  ionViewWillEnter(){
    this.data.user['biaoshi']=""
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
