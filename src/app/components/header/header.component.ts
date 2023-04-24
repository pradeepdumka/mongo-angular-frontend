import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from '@services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isUserLoggedIn:boolean=false
  constructor(private router: Router,private mainService: MainService,private _snackBar: MatSnackBar){
    let isUser: any = this.mainService.getDataFromStorage('userData');
    let user = JSON.parse(isUser);
    let token = user?.accessToken;
    if(token){
      this.mainService.isLogin(true)
    }
    this.mainService.checkUserLogin().subscribe(val=> this.isUserLoggedIn = val );
  }
  navigate(path:string){
    if(path === 'news'){
      const message = "Login required for view latest news .";
        const action = "DISMISS";
        this._snackBar.open(message, action, {
          verticalPosition: 'bottom',
          duration: 3000,
          horizontalPosition: 'end', 
          panelClass: ['red-snackbar'],
        });
    }
    this.router.navigate([path])
  }

  logout(){
      this.isUserLoggedIn=false;
      this.mainService.isLogin(false);
      this.mainService.clearStorageData('userData')
      this.router.navigate(['/'])
  }
}
