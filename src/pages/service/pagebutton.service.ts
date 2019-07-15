import {Injectable} from "@angular/core";

@Injectable()
export class PagebuttonService{
  nav;
  num;
  init(nav,num):void{
    this.nav=nav;
    this.num=num
  }
  goPage(page,parmas?):void{
    this.nav.push(page,parmas);
  }
  backPage(parmas?):void{
    this.nav.pop(parmas)
  }
  slected(number){
    this.num.select(number)
  }
}
