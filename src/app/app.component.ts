import { Component } from '@angular/core';
import { Platform,App, NavController,ToastController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {DataService} from "../pages/service/data.service";
import {PagebuttonService} from "../pages/service/pagebutton.service";
import {AppMinimize} from "@ionic-native/app-minimize";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications/";
import {Insomnia} from "@ionic-native/insomnia/ngx";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  alert;
  timer;
  constructor(private platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public appCtrl: App,
              public shimian:Insomnia,
              public toastCtrl: ToastController,
              private alertCtrl:AlertController,
              private data:DataService,
              private backgroundMode:BackgroundMode,
              private nav:PagebuttonService,
              private appMinimize: AppMinimize,
              private localNotifications: LocalNotifications,
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*(<any>window).StatusBar.show();*/
      statusBar.backgroundColorByHexString('#00FFFFFF')
      splashScreen.hide();

      platform.registerBackButtonAction(()=>{
        if(this.data.user['biaoshi']=="缩小app"){
          this.appMinimize.minimize();
        }else{
          this.nav.backPage()
        }
      })
    });
  }

}
