import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the DrugDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drug-detail',
  templateUrl: 'drug-detail.html',
})
export class DrugDetailPage {
  drug;
  drug_name_en;
  ingredients;
  indication;
  drug_name_cn;
  drug_name_show;
  dosage;
  reactions;
  drug_name_py;
  contraindications;
  precautions;
  drug_interactions;
  approve_code;
  mechanism_action;
  company_name;
  drug_name_common;
  otc;
  @ViewChild ("OTC") OTC
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }
  ionViewDidLoad() {
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    var data1=(this.navParams.get('detail'))
    console.log(data1)
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':4,'drug':data1.drug_id},
      dataType: 'json',
      success:(res)=> {
        console.log(data1.drug_id)
        this.drug_name_en=res[0].drug_name_en;
        this.ingredients=res[0].ingredients;
        this.indication=res[0].indication;
        this.drug_name_cn=res[0].drug_name_cn;
        this.drug_name_py=res[0].drug_name_py;
        this.dosage=res[0].dosage;
        this.drug_name_show=res[0].drug_name_show
        this.reactions=res[0].reactions;
        this.contraindications=res[0].contraindications;
        this.precautions=res[0].precautions;
        this.drug_interactions=res[0].drug_interactions;
        this.approve_code=res[0].approve_code;
        this.otc=res[0].otc;
        this.company_name=res[0].company_name;
        this.mechanism_action=res[0].mechanism_action
        this.drug_name_common=res[0].drug_name_common
        if(this.otc==0){
          this.OTC.nativeElement.style.color="#000"
        }else if(this.otc==1){
          this.OTC.nativeElement.innerHTML="OTC"
          this.OTC.nativeElement.style.backgroundColor="blue"
          this.OTC.nativeElement.style.border="none"
        }else if(this.otc==2){
          this.OTC.nativeElement.innerHTML="甲类OTC"
          this.OTC.nativeElement.style.backgroundColor="red"
          this.OTC.nativeElement.style.border="none"
        }else if(this.otc==3){
          this.OTC.nativeElement.innerHTML="乙类OTC"
          this.OTC.nativeElement.style.backgroundColor="green"
          this.OTC.nativeElement.style.border="none"
        }else if(this.otc==""){
          this.OTC.nativeElement.style.backgroundColor="#fff"
          this.OTC.nativeElement.style.border="none"
          this.OTC.nativeElement.innerHTML=""
        }
      }
    })
  }
  backPrive(){
    if(this.data.user['buttonPage']=="孙悟空"){
      this.navCtrl.popToRoot()
      this.data.user['biaoshi']="缩小app"
    }else{
      this.nav.backPage()
    }
  }
}
