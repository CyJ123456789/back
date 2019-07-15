import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform ,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PagebuttonService} from "../service/pagebutton.service";
import {QrScannerPage} from "../qr-scanner/qr-scanner";
import {variable} from "../../util/globalVariable";
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import {Keyboard} from "ionic-angular";
import {DataService} from "../service/data.service";

declare var $:any;
/**
 * Generated class for the AllertDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-allert-detail',
  templateUrl: 'allert-detail.html',
})
export class AllertDetailPage {
  time:any[]=[]
  time1:string=""
  time2:string="";
  time3:string="";
  time4:string="";
  time5:string="";
  time6:string="";
  time7:string="";
  time8:string="";
  time9:string="";
  concernid;
  drug;
  index:number=1
  drugid;
  nickName;
  @ViewChild('input') input;
  @ViewChild('more1') more1
  @ViewChild("show") show
  recording: boolean = false;
  filePath: string;
  fileName: string;
  Taking_cycle;
  number;
  drugList;
  doses_quantity;
  audio: MediaObject;
  audioList: any[] = [];
  listData:any[]=[];
  drug_list:any[]=[];
  @ViewChild('clavier') clavier
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private nav:PagebuttonService,
              private alert:AlertController,
              private media: Media,
              private file:File,
              private platform:Platform,
              private modalCtrl:ModalController,
              private keyboard:Keyboard,
              private data:DataService
              ) {
  }
  ionViewWillEnter() {
    this.data.user['biaoshi']=""
    if(variable.scanTxt){
      this.drug=variable.scanTxt;
      this.interaction(this.drug_list)
    }else{
      var data1=(this.navParams.get('guardian'))
      if(data1!=undefined){
        this.concernid=data1.guardainid
        this.nickName =data1.nickname
        this.time.push("08:00")
      }
      var data2=(this.navParams.get('item1'))
      if(data2!=undefined){
        console.log(data2)
        this.concernid=data2.concern_id;
        this.drugid=data2.take_medicine_id;
        this.drug=data2.drug;
        this.time[0] = data2.times1;
        console.log(data2)
        if(data2.times2!="00:00"){
          this.time.push(data2.times2)
        }
        if(data2.times3!="00:00"){
          this.time.push(data2.times3)
        }
        if(data2.times4!="00:00"){
          this.time.push(data2.times4)
        }
        if(data2.times5!="00:00"){
          this.time.push(data2.times5)
        }
        if(data2.times6!="00:00"){
          this.time.push(data2.times6)
        }if(data2.times7!="00:00"){
          this.time.push(data2.times7)
        }if(data2.times8!="00:00"){
          this.time.push(data2.times8)
        }
        if(data2.times9!="00:00"){
          this.time.push(data2.times9)
        }
        if(this.time.length==9){
          this.more1.nativeElement.style.display="none";
        }
        this.Taking_cycle=data2.Taking_cycle;
        this.number=data2.doses_hz;
        this.doses_quantity=data2.doses_quantity
      }
      this.index=this.time.length
      this.time_manage(this.time)
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':3, 'concernid':this.concernid},
        dataType: 'json',
        success: (res) => {
          if(res!=undefined){
            for(var i=res.length-1;i>=0;i--){
              let time1=Number(new Date(res[i].creationtime))
              let time2=Number(new Date())
              let time3=86400000*Number(res[i].Taking_cycle)
              let time4=time3-(time2-time1)
              if(time4<=0){
                res.splice(i,1)
              }
            }
          }
          this.drug_list=res;
          this.drug_list.push({Notes: "",
            Records: "",
            Taking_cycle: "2",
            concern_id: "4",
            creationtime: "2019-01-08 09:49:00",
            doses_hz: "3",
            doses_quantity: "4",
            drug: "没有这种药",
            nickname: "爸爸",
            state: "0",
            take_medicine_id: "82",
            times1: "08:00:00",
            times2: "12:00:00",
            times3: "19:00:00",
            times4: "00:00:00",
            times5: "00:00:00",
            times6: "00:00:00",
            times7: "00:00:00",
            times8: "00:00:00",
            times9: "00:00:00",
            times10: "00:00:00"})
        }
      })
    }
  }
  /*  进入扫码界面 */
  click(id){
    variable.isSweep=false;
    this.nav.goPage(QrScannerPage,{detail8:1});
  }
  /*  页面离开时清空全局变量  */
  ionViewWillLeave(){
    variable.scanTxt="";
  }
  /* 药品添加 */
  submit(){
    console.log(this.time1,this.time2,this.time3,this.time4,this.time5,this.time6,this.time7,this.time8,this.time9)
    if(this.drug==undefined||this.Taking_cycle==undefined||this.doses_quantity==undefined){
      let alert = this.alert.create({
        title: "请完善被监护人用药信息",
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      }).present();
    }
    else{
      if(this.drugid==undefined){
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':30,'concernid':this.concernid,'drug':this.drug,'time1':this.time1,'time2':this.time2,'time3':this.time3,'time4':this.time4,'time5':this.time5,'time6':this.time6,'time7':this.time7,'time8':this.time8,'time9':this.time9,'Taking_cycle':this.Taking_cycle,'doses_hz':this.index,'doses_quantity':this.doses_quantity,'units':''},
          dataType: 'json',
          success: (res) => {
            let alert = this.alert.create({
              title: "添加成功",
              buttons: [
                {
                  text: '确定',
                  role: 'cancel',
                  handler: () => {
                    this.nav.backPage()
                  }
                }
              ]
            }).present();
          },
        })
      } else{
        let alert = this.alert.create({
          title: "不能对用药信息做修改",
          cssClass:'projectList',
          buttons: [
            {
              text: '确定',
              role: 'cancel',
              handler: () => {

              }
            }
          ]
        }).present();
      }/*else {
        $.ajax({
          url: 'http://112.74.184.215',
          type: 'POST',
          data: {'control':31,'time1':this.time1,'time2':this.time2,'time3':this.time3,'time4':this.time4,'time5':this.time5,'time6':this.time6,'time7':this.time7,'time8':this.time8,'time9':this.time9,'Taking_cycle':this.Taking_cycle,'doses_hz':this.index,'doses_quantity':this.doses_quantity,'units':'','takemedicineid':this.drugid},
          dataType: 'json',
          success: (res) => {
            let alert = this.alert.create({
              title: "修改成功",
              buttons: [
                {
                  text: '确定',
                  role: 'cancel',
                  handler: () => {
                    this.nav.backPage()

                  }
                }
              ]
            }).present();
          },
        })
      }*/
    }
  }
  onblur(){
     this.interaction(this.drug_list)
  }

  interaction(item){
    let arrlist=[]
    let h=0
    if(item.length!=0){
      new Promise(
        resolve=>{
          for(let t=0;t<item.length;t++){
            $.ajax({
              url: 'http://112.74.184.215',
              type: 'POST',
              data: {'control': 62, 'drug_name_cn': this.drug,'drug_name_cn2':item[t].drug},
              dataType: 'json',
              success: (res) => {
                console.log(res)
                console.log(h)
                h++
                if(res.length!=0){
                  console.log(res[0].influence)
                  let s = res[0].influence.replace(/\{A\}/g,res[0].vsA)
                  let h = s.replace(/\{B\}/g,res[0].vsB)
                  arrlist.push(h)
                }
                if(h==item.length){
                  resolve(1)
                }
              },
            })
          }
        }
      ).then(
        val=>{
          if(arrlist.length!=0){
            let n= arrlist.join("】【")
            const interaction = this.alert.create({
              title: `【${n}】,是否继续添加`,
              cssClass:'projectList',
              buttons: [
                {
                  text: '否',
                  handler: () => {
                    this.drug=""
                  }
                },
                {
                  text: '是',
                  handler: () => {

                  }
                }
              ]
            });
            interaction.present();
          }
        }
      )
    }
  }
  more(){
    this.time=[]
    if(this.time1!=""&&this.time1!="00:00"){
      this.time.push(this.time1)
    }
    if(this.time2!=""&&this.time2!="00:00"){
      this.time.push(this.time2)
    }
    if(this.time3!=""&&this.time3!="00:00"){
      this.time.push(this.time3)
    }
    if(this.time4!=""&&this.time4!="00:00"){
      this.time.push(this.time4)
    }
    if(this.time5!=""&&this.time5!="00:00"){
      this.time.push(this.time5)
    }
    if(this.time6!=""&&this.time6!="00:00"){
      this.time.push(this.time6)
    }
    if(this.time7!=""&&this.time7!="00:00"){
      this.time.push(this.time7)
    }
    if(this.time8!=""&&this.time8!="00:00"){
      this.time.push(this.time8)
    }
    if(this.time9!=""&&this.time9!="00:00"){
      this.time.push(this.time9)
    }
    this.time.push("07:00")
    if(this.time.length==9){
      this.more1.nativeElement.style.display="none"
    }
    this.index=this.time.length
    this.time_manage(this.time)
  }


  cancel(i){
    if(this.time.length!=1){
      this.time.splice(i,1)
    }
    this.index=this.time.length
    if(this.time.length<9){
      this.more1.nativeElement.style.display="block"
    }
    this.time1="00:00"
    this.time2="00:00"
    this.time3="00:00"
    this.time4="00:00"
    this.time5="00:00"
    this.time6="00:00"
    this.time7="00:00"
    this.time8="00:00"
    this.time9="00:00"
    this.time_manage(this.time)
  }
  time_manage(time){
    for(let i=0;i<time.length;i++){
      if(i<time.length){
        if(i==0){
          this.time1=time[i]
        }else if(i==1){
          this.time2=time[i]
        }else if(i==2){
          this.time3=time[i]
        }else if(i==3){
          this.time4=time[i]
        }else if(i==4){
          this.time5=time[i]
        }else if(i==5){
          this.time6=time[i]
        }else if(i==6){
          this.time7=time[i]
        }else if(i==7){
          this.time8=time[i]
        }else if(i==8){
          this.time9=time[i]
        }
      }
    }
  }

  change(){
    if (this.drug == undefined || this.drug == "") {
      this.show.nativeElement.style.display="none";
    } else {
      $.ajax({
        url: 'http://112.74.184.215',
        type: 'POST',
        data: {'control':6,'drug':this.drug,'start':0,'num':11},
        dataType: 'json',
        success:(res)=> {
          console.log(res)
          this.drugList=res;
          if(res.length!=0){
            this.show.nativeElement.style.display="block";
          }else{
            console.log("爱是你我")
            this.show.nativeElement.style.display="none";
          }
        }
      })
    }
  }
  commen(id){
    $.ajax({
      url: 'http://112.74.184.215',
      type: 'POST',
      data: {'control':4,'drug':id},
      dataType: 'json',
      success:(res)=> {
        this.drug=res[0].drug_name_common
        this.show.nativeElement.style.display="none";
        this.interaction(this.drug_list)
      }
    })
  }
}
