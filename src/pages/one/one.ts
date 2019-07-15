import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {TwoPage} from "../two/two";
import {DataService} from "../service/data.service";

declare var $:any;
/**
 * Generated class for the OnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-one',
  templateUrl: 'one.html',
})
export class OnePage {
  one;
  oneList;
  twoPage= TwoPage;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }

  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    var data1=(this.navParams.get('oneMessage'))
    console.log(data1)
    this.one = data1.Disease_one_list_name
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':12,'diseaseonename':data1.Disease_one_list_name,'start':0,'num':100},
      dataType: 'json',
      success:(res)=> {
        console.log(res)
        this.oneList = res
      }
    })
  }

}
