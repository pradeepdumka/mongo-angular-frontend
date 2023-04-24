import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, name:string) {
        console.log("v" ,value)
        console.log("name" ,name)
    if(!name){
        return value;
    }
   let filterVal =  value.filter((d:any)=> d.Title.toLowerCase().includes(name.toLowerCase()) || d.Year === name )
    return filterVal
  }

}
