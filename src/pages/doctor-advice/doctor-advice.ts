import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import {Media, MediaObject} from "@ionic-native/media";
import { Storage } from '@ionic/storage';
import {File} from "@ionic-native/file";
import {DataService} from "../service/data.service";
import {NimabiPage} from "../nimabi/nimabi";
/**
 * Generated class for the DoctorAdvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-advice',
  templateUrl: 'doctor-advice.html',
})
export class DoctorAdvicePage {
  recording: boolean = false;
  recordBoolen: boolean = false;
  filePath: string;
  now;
  index;
  formerly;
  playboolean: boolean = false
  record_name;
  time1;
  fileName: string;
  audio: MediaObject;
  audioplay: MediaObject;
  audioList: any[] = [];
  listData: any[] = [];
  @ViewChild("record") record;
  @ViewChild("inner") inner;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nav: PagebuttonService,
              private alert: AlertController,
              private storage: Storage,
              private media: Media,
              private data:DataService,
              private file: File,
              private platform: Platform) {
  }

  startReocrd() {  //开始录音

    //文件URL，文件存放在拓展内存卡中文件夹下，命名为Record.mp3
    if (this.recordBoolen == false) {
      let prompt = this.alert.create({
        inputs: [
          {
            name: 'title',
            placeholder: '请输入该医嘱名称'
          },
        ],
        buttons: [
          {
            text: '确定',
            handler: data => {
              this.record_name = data.title
              this.filePath = this.file.externalDataDirectory + new Date() + "Record.mp3";
              this.audio = this.media.create(this.filePath);
              this.recordBoolen = true;
              this.record.nativeElement.style.backgroundColor = "green"
              this.inner.nativeElement.innerHTML = "结束录音"
              this.audio.startRecord();
              this.formerly = new Date()
            }
          }
        ]
      });
      prompt.present();
    } else {
      this.audio.stopRecord();
      this.audio.play()
      this.audio.stop()
      console.log(this.audio)
      this.now = new Date()
      let ms = Number(this.now) - Number(this.formerly)
      let s = Math.ceil(ms / 1000)
      this.audioList.unshift({
        "time": s,
        "content": this.audio,
        "record_name": this.record_name,
        "filePath": this.filePath,
        "time1": new Date()
      })
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recordBoolen = false;
      this.record.nativeElement.style.backgroundColor = "red"
      this.inner.nativeElement.innerHTML = "开始录音"
      console.log(this.record_name)
      this.filePath = ""
      this.audio = null;
    }
    //开始录音
  }

  play(item) {
    if (this.time1 == undefined || this.time1 != item.time1) {
      if (this.audioplay == undefined) {
        this.audioplay = this.media.create(item.filePath);
        this.audioplay.play();
        this.time1 = item.time1
      } else {
        this.audioplay.stop()
        this.audioplay = this.media.create(item.filePath);
        this.audioplay.play();
        this.time1 = item.time1
      }
    } else {
      this.audioplay.play();
    }
  }

  stop(item) {
    if (this.time1 == item.time1) {
      this.audioplay.stop()
    }
  }

  pauseRecord(item) {
    if (this.time1 == item.time1) {
      this.audioplay.pause();
    }
  }

  /*  离开此页面时停止播放录音 */
  ionViewDidLeave() {
    this.audioplay.stop()
  }

  delete(i) {
    this.audioList.splice(i, 1)
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
  }

  ionViewWillEnter() {
    this.data.user['biaoshi']=''
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
    }
  }
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
}
