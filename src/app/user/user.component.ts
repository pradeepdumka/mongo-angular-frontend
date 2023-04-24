import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private mainService:MainService,public route: Router){
    this.mainService.checkUserLogin().subscribe(val=>{ if(val) this.route.navigate(['news'])});
  }
  selectedTab : number = 0;
  registerAction(action:any): void{
    this.selectedTab = action;
}
loginAction(action:any): void{
 this.selectedTab = action;
}
onTabClick(event: any): void { 
  console.log(event.index)
  this.selectedTab = event.index;
}
}
