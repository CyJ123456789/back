import { Component,ViewChild } from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {IllnessPage} from "../illness/illness";
import {DataService} from "../service/data.service";
import {OnePage} from "../one/one";

declare var $:any;

/**
 * Generated class for the CheckDiseasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-disease',
  templateUrl: 'check-disease.html',
})
export class CheckDiseasePage {
  @ViewChild('ul') ul;
  @ViewChild('u2') u2;
  illness=IllnessPage;
  @ViewChild(Content) content: Content;
  diseaseonename;
  search;
  list:any[] = [];
  item:any[] = [];
  item1:any[] = [];
  onePage = OnePage
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private nav:PagebuttonService) {
  }

  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=''
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':11,'start':0,'num':20},
      dataType: 'json',
      success:(res)=> {
        this.list=res;
      }
    })
  }
  onClick($event){
    var illness=$event.target.innerHTML;
    this.diseaseonename=$event.target.innerHTML;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':12,'diseaseonename':illness,'start':0,'num':100},
      dataType: 'json',
      success:(res)=> {
        console.log(res)
        this.item=res;
        if(res.length!=0){
          this.ul.nativeElement.style.display="block";
        }
      }
    })
  }
  onClick1($event){
    var illness2=$event.target.innerHTML;
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':13,'diseaseonename':this.diseaseonename,'diseasetwoname':illness2,'start':0,'num':10},
      dataType: 'json',
      success:(res)=> {
        this.item1=res;
        if(res.length!=0){
          this.ul.nativeElement.style.display="none";
          this.u2.nativeElement.style.display="block";
          this.scrollToTop()
        }
      }
    })
  }
  change(){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':7,'disease':this.search,'start':0,'num':10},
      dataType: 'json',
      success:(res)=> {
        if(res.length!=0){
          this.item1=res;
          this.u2.nativeElement.style.display="block";
        }
      }
    })
  }
  ionViewDidLeave(){
    this.u2.nativeElement.style.display="none";
  }
  scrollToTop() {
    setTimeout(() => {
      this.content.scrollToTop();
    }, 100);
  }
}
