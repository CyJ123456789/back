import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DrugDetailPage} from "../drug-detail/drug-detail";
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the DrugUseRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drug-use-record',
  templateUrl: 'drug-use-record.html',
})
export class DrugUseRecordPage {
  drugdetail=DrugDetailPage;
  concern;
  druglist: any[] = [];
  @ViewChild("none") none;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    var data1=(this.navParams.get('history'))
    this.concern=data1.nickname;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':33,'concern_id':data1.concern_id},
      dataType: 'json',
      success: (res) => {
        console.log(res)
        if(res.length==0){
          this.none.nativeElement.style.display="block";
        }else {
          this.none.nativeElement.style.display="none";
          this.druglist=res;
          for(var i=0;i<this.druglist.length;i++){
            this.druglist[i].creationtime=this.druglist[i].creationtime.slice(0,11)
          }
        }
      }
    })
  }
}
