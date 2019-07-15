import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {IllnessPage} from "../illness/illness";
import {DataService} from "../service/data.service";

declare var $:any;
/**
 * Generated class for the TwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-two',
  templateUrl: 'two.html',
})
export class TwoPage {
  two;
  twoList;
  illness = IllnessPage
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }

  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    var data1=(this.navParams.get('twoMessage'))
    console.log(data1)
    this.two = data1.two
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':13,'diseaseonename':data1.one,'diseasetwoname':data1.two,'start':0,'num':15},
      dataType: 'json',
      success:(res)=> {
         this.twoList = res
      }
    })
  }

}
