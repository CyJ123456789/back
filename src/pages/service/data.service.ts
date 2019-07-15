import {Injectable} from "@angular/core";

@Injectable()

export class DataService{
  user:object={
    imageda:"../assets/imgs/1.jpg",
    userid:"",
    user_name:'',
    nickname:"",
    alertList:[],
    userinfo:[],
    user_phone:"",
    switch:"我是你",
    buttonPage:"",
    biaoshi:"",
    alertMessage:[],
    chatMessage:[],
    Num:0,
    messageAlert:false,
  };
}
