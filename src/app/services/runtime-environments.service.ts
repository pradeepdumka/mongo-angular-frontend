import { Injectable } from '@angular/core';
import { EnvConfig } from '@configs';

@Injectable({
  providedIn: 'root'
})
export class RuntimeEnvironmentsService {
  runenvname:string='';
  API_BASEURL:string='';
  constructor() {
    this.runenvname=EnvConfig.setting.name;
    this.API_BASEURL=EnvConfig.setting.API_BASEURL;
   }
  
}
