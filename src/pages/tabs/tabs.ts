import {Component, ViewChild, ElementRef, Renderer2, Renderer} from '@angular/core';
import {Events,Tabs} from "ionic-angular";
import {NavController, Platform} from "ionic-angular";
import {PagebuttonService} from "../service/pagebutton.service";
import {DataService} from "../service/data.service";
import {createViewChild} from "@angular/compiler/src/core";
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {IndexPage} from "../index";
import {MessagePage} from "../message/message";
import { Storage } from '@ionic/storage';

declare var $:any;
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("tabs")  Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = MessagePage;
  tab5Root = IndexPage;
  messageid;
  constructor(private nav: NavController,
              private elementRet:ElementRef,
              private render:Renderer,
              private event:Events,
              private navsercive:PagebuttonService,
              private storage:Storage,
              private data:DataService,
              private platform:Platform) {
    platform.ready().then(() => {
      navsercive.init(nav, this.Tabs)
      let n=this.storage.get('phone')
      n.then((data)=> {
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control': 2, 'userid': data},
          dataType: 'json',
          success: (res) => {
            if(res.length!=0){
              this.data.user["userinfo"]=res;
              this.data.user["imageda"]=res[0].head_portrait;
              this.data.user["user_name"]=res[0].nickname;
              this.data.user["user_phone"]=res[0].userid;
            }else{

            }
          }
        })
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control': 36, 'userid': data},
          dataType: 'json',
          success: (res) => {
            if(res[0].one=="false"){
              this.data.user["switch"]="你是我"
            }else{
              this.data.user["switch"]="我是你"
            }
          }
        })
      })
    })

  }
}
