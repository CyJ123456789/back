import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DrugUseRecordPage} from "../drug-use-record/drug-use-record";
import {DataService} from "../service/data.service";
import { Storage } from '@ionic/storage';
declare var $:any;


/**
 * Generated class for the MedicalHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-history',
  templateUrl: 'medical-history.html',
})
export class MedicalHistoryPage {
  druguserecord=DrugUseRecordPage;
  kinsfolk:any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private storage:Storage) {
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
        data: {'control': 1, 'userid': data,},
        dataType: 'json',
        success: (res) => {
          console.log(res);
          this.kinsfolk=res;
        }
      })
    })
  }

}
