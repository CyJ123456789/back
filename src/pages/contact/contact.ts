import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {ChatPage} from "../chat/chat";
import {Storage} from "@ionic/storage";
import {DataService} from "../service/data.service";
import {DarlingPage} from "../darling/darling";

declare var $:any;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  physicianList;
  chatpage=ChatPage;
  dar=DarlingPage;
  constructor(public navCtrl: NavController,
              private nav:PagebuttonService,
              private storage:Storage,
              private data:DataService,
              private alertCtrl:AlertController) {}
  ionViewWillEnter(){
    this.data.user['biaoshi']='缩小app'
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':49},
      dataType: 'json',
      success:(res)=> {
        this.physicianList=res;
      }
    })
  }
  goChatPage(item){
    let b=this.storage.get('phone')
    b.then((data)=>{
      if(data==item.phone){

      }else{
        this.nav.goPage(ChatPage,{message:item})
      }
    })
  }
}
