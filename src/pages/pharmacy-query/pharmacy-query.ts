import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController, Platform } from 'ionic-angular';
import {PagebuttonService} from "../service/pagebutton.service";
import { Storage } from '@ionic/storage';
import {DataService} from "../service/data.service";

declare var BMap;
declare var BMapLib;
@IonicPage()
@Component({
  selector: 'page-pharmacy-query',
  templateUrl: 'pharmacy-query.html',
})
export class PharmacyQueryPage {
  map: any;
  address;
  location1;
  myGeo: any;
  myValue;
  myIcon: any;
  @ViewChild('map') allmap;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private data:DataService,
              private storage:Storage,
              private nav:PagebuttonService
  ) {
  }
  ionViewDidLoad() {

  }
  /*location(){
    this.map = new BMap.Map(this.allmap.nativeElement,{ enableMapClick: true });
    this.map.centerAndZoom(this.location1, 13);
    this.map.enableScrollWheelZoom(true);
    this.myGeo = new BMap.Geocoder();
    var geolocationControl = new BMap.GeolocationControl();
    this.map.addControl(geolocationControl);
  }*/
  ionViewWillLeave(){
    this.data.user['biaoshi']="缩小app"
  }
  ionViewWillEnter(){
    this.data.user['biaoshi']=""
    function G(id) {
      return document.getElementById(id);
    }
    this.map = new BMap.Map("map",{ enableMapClick: true });
    this.map.centerAndZoom("北京",12);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition((r)=>{
      if(geolocation.getStatus() == 0){
        var mk = new BMap.Marker(r.point);
        this.map.addOverlay(mk);
        this.map.panTo(r.point);
      }
      else {
      }
    },{enableHighAccuracy: true})
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {"input" : "suggestId"
        ,"location" : this.map
      });
    ac.addEventListener("onhighlight", e=> {  //鼠标放在下拉列表上的事件
      var str = "";
      var _value = e.fromitem.value;
      var value = "";
      if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      }
      str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

      value = "";
      if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      }
      str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
      G("searchResultPanel").innerHTML = str;
    });
    ac.addEventListener("onconfirm",e=> {    //鼠标点击下拉列表后的事件
      var _value = e.item.value;
      this.myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
      G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + this.myValue;
      this.setPlace();
    });
  }
  setPlace(){
    this.map.clearOverlays();    //清除地图上所有覆盖物
    var pp;
    var storage=this.storage;
    function myFun(){
      /*var map1=document.getElementById("map");*/
      var map=new BMap.Map("map",{ enableMapClick: true });
      pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
      storage.set("location",pp);
      map.centerAndZoom(pp, 18);
      map.addOverlay(new BMap.Marker(pp));    //添加标注
    }
    var local = new BMap.LocalSearch(this.map, { //智能搜索
      onSearchComplete: myFun
    });
    local.search(this.myValue);
  }
  go(){
    this.map.clearOverlays();
    let n = this.storage.get('location')
    n.then((data) => {
      console.log(data);
     /* var map1=document.getElementById("map");*/
      var map=new BMap.Map("map",{ enableMapClick: true });
      console.log(data.lng)
      console.log( data.lat)
      map.centerAndZoom(new BMap.Point(data.lng, data.lat), 11);
      map.enableScrollWheelZoom(true);
      var myKeys = ["药店","诊所","药房","医院"];
      var local = new BMap.LocalSearch(map,{renderOptions: {map: map, panel: "r-result1"},
         pageCapacity:5
      });
      local.searchNearby(myKeys, new BMap.Point(data.lng, data.lat),2000);
      this.allmap.nativeElement.style.height="70%";
    })
  }
}
