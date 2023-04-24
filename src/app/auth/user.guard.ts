import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
 
import { MainService } from '../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private mainService:MainService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let isUser:any = this.mainService.getDataFromStorage("userData");
   
  
    let user = JSON.parse(isUser);
    
    if (user?.accessToken) {
      return true;
    }
 
    return this.router.createUrlTree(['']);

    

  }

}
