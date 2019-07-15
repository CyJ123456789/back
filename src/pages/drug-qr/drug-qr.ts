import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataService} from "../service/data.service";
import {PagebuttonService} from "../service/pagebutton.service";

/**
 * Generated class for the DrugQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drug-qr',
  templateUrl: 'drug-qr.html',
})
export class DrugQrPage {
  alertList:any[]=[]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService
              ) {
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    if(this.data.user['alertMessage'][0]!=undefined){
      this.alertList=this.data.user['alertMessage']
    }
  }
  ionViewWillLeave(){
    this.data.user['alertMessage']=[];
    this.data.user['biaoshi']="缩小app"
    this.data.user['messageAlert']=false
  }

  buqingchu(){
    this.nav.backPage()
    this.nav.slected(3)
  }
}
