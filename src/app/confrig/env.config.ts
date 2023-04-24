import { AppEnvConfig } from "@models";
import { EnvConfigLocal,EnvConfigProd  } from "@configs";

export class EnvConfig{
    static setting:AppEnvConfig;
    loadEnvironments(){
        return new Promise((resolve)=>{
            let szHostName=window.location.hostname
            if(szHostName=='localhost'){
             EnvConfig.setting= <AppEnvConfig>EnvConfigLocal;    
            }else{
             EnvConfig.setting= <AppEnvConfig>EnvConfigProd; 
            }
            resolve(true)
        })
    }
}