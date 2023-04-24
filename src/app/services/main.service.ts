import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RuntimeEnvironmentsService } from './runtime-environments.service';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private isUserLoggedIn = new BehaviorSubject(false)
  private isLoginCast = this.isUserLoggedIn.asObservable();
  constructor(
    private http : HttpClient,
    private env:RuntimeEnvironmentsService
  ) { }
   

  getAllNews(params?:any):Observable<any>{
    let options = {}
    if(params.page){
      options =  new HttpParams().set('page', params.page);
    }
    if(params.search){
      options =  new HttpParams().set('search', params.search);
    }
   
    return this.http.post(`${this.env.API_BASEURL}/api/news`,{},{params:options})
  }

  login(obj:any):Observable<any>{
    return this.http.post(`${this.env.API_BASEURL}/auth/login`,obj)
  }

  signup(obj:any):Observable<any>{
    return this.http.post(`${this.env.API_BASEURL}/auth/signup`,obj)
  }

  addDataToStorage(userData:any){
    localStorage.setItem('userData',JSON.stringify(userData));
  }

  getDataFromStorage(storageKey: any) {
    return localStorage.getItem(storageKey);
  }

  clearStorageData(storageKey: any) {
    return localStorage.removeItem(storageKey);
  }

  isLogin(val:boolean){
     this.isUserLoggedIn.next(val);
  }

  checkUserLogin(){
    return this.isLoginCast;
  }
}
