import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {DrugDetailPage} from "../drug-detail/drug-detail";
import {Keyboard} from "ionic-angular";
import {DataService} from "../service/data.service";

declare var $:any;

/**
 * Generated class for the FindDrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-drug',
  templateUrl: 'find-drug.html',
})
export class FindDrugPage {
  drugDetail=DrugDetailPage;
  @ViewChild('p') p
  @ViewChild('ul') ul
  @ViewChild ("select") select
  @ViewChild ('drug') drug
  @ViewChild ('symptom') symptom
  search;
  biaoji:string="1"
  n:'woshishui'
  list:any[] = [];
  item:any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav:PagebuttonService,
              private data:DataService,
              private keyboard:Keyboard ) {
  }

  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    this.data.user['buttonPage']="猪八戒"
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':14,'start':0,'num':20},
      dataType: 'json',
      success:(res)=> {
        this.item=res;
      }
    })
  }
  change() {
    if (this.search == undefined || this.search == "") {
      this.ul.nativeElement.style.display="none";
    } else {
      console.log(this.biaoji)
      if(this.biaoji=="1"){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':6,'drug':this.search,'start':0,'num':20},
          dataType: 'json',
          success:(res)=> {
            this.list=res;
            console.log(res)
            if(res.length!=0){
              this.ul.nativeElement.style.display="block";
            }
          }
        })
      }else{
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':60,'drug':this.search,'start':0,'num':20},
          dataType: 'json',
          success:(res)=> {
            this.list=res;
            if(res.length!=0){
              console.log(res)
              this.ul.nativeElement.style.display="block";
            }
          }
        })
      }
    }
  }
  onClick($event){
    var drug=$event.target.innerHTML;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':15,'drug':drug,'start':0,'num':100},
      dataType: 'json',
      success:(res)=> {
        this.list=res;
        if(res.length!=0){
          this.ul.nativeElement.style.display="block";
        }
      }
    })
  }
  ionViewDidLeave(){
    this.ul.nativeElement.style.display="none";
    this.search = ""
  }

  option($event){
    if($event.target.innerHTML=="药名"){
      $event.target.style.borderBottom="2px solid orange"
      $event.target.style.color="orange"
      this.symptom.nativeElement.style.border="none"
      this.symptom.nativeElement.style.color = "#000"
      this.biaoji ="1"
      this.search = ""
    }else{
      $event.target.style.borderBottom="2px solid orange"
      $event.target.style.color="orange"
      this.drug.nativeElement.style.border="none"
      this.drug.nativeElement.style.color = "#000"
      this.biaoji = "2"
      this.search = ""
    }
  }

}
