import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AllertDetailPage} from "../allert-detail/allert-detail";
import {DrugNamePage} from "../drug-name/drug-name";
import { Storage } from '@ionic/storage';
import {PagebuttonService} from "../service/pagebutton.service";
import {CareAboutPage} from "../care-about/care-about";
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the AllertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allert',
  templateUrl: 'allert.html',
})
export class AllertPage {
  kinsfolk:any[] = [];
  @ViewChild("p1") p1;
  @ViewChild("p2") p2;
  careabout=CareAboutPage;
  ad=AllertDetailPage;
  drugName=DrugNamePage;
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
    this.data.user['biaoshi']=''
    let n = this.storage.get('phone')
    n.then((data) => {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':1,'userid':data},
        dataType: 'json',
        success: (res) => {
          if(res.length==0){
            this.p1.nativeElement.style.display="block";
            this.p2.nativeElement.style.display="block";
          }else {
            this.kinsfolk=res;
            this.p1.nativeElement.style.display="none";
          }
        }
      })
    })
  }
}
