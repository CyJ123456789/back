import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the IllnessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-illness',
  templateUrl: 'illness.html',
})
export class IllnessPage {
  disease_name_cn
  illness;
  defination;
  treatment;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }

  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    var data1=(this.navParams.get('illness'))
    this.illness=data1.disease_name_cn;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':8,'disease':this.illness},
      dataType: 'json',
      success:(res)=> {
        this.disease_name_cn=res[0].disease_name_cn
        this.defination=res[0].defination;
        this.treatment=res[0].treatment
      }
    })
  }
}
