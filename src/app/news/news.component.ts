
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { FilterPipe } from '@pipes';
import { MainService } from '@services';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { debounceTime, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
 
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  breakpoint!: number;
  arrNnews: any = [];
  search:string='';
  curentPage:number=0;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  spinner:boolean=false;

 
  constructor(private mainServices: MainService, private router: Router,
    private filter: FilterPipe,private _snackBar: MatSnackBar){
  }

  ngOnInit(){
    this.breakpoint = window.innerWidth <= 400 ? 1 : 4;
    this.getSearchData();
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 4;
  }

  getDetails(movie: any) {
    this.router.navigate(['movie/', movie.imdbID]);
  }

  searNewsByTitle(val:string){
    this.getSearchData()
  }

  onScroll() {
    this.curentPage++
    this.getSearchData() 
  }



  onScrollUp(){
    if(this.curentPage > 1){
      this.curentPage--
      this.getSearchData();
    }
  }

  getOnClickSearch(){
    this.arrNnews = [];
    this.getSearchData();
  }

  getSearchData(){
    this.spinner= true;
    let obj:any ={}
    
    if(this.curentPage || this.search){
      obj["page"]= this.curentPage;
      obj["search"]=this.search;
    }
    let srcObservable= of(obj);
    
    srcObservable.pipe(
     // tap((v)=>console.log(v)),
      debounceTime(500),
      switchMap( val => {
        return this.mainServices.getAllNews(val)
      }),
    )
    .subscribe(res=> {
     
      let resArray =[...this.arrNnews, ...res.response.arrNews];
      let items:any=[]
      resArray.map((item)=>{
          if(items.some((el:any) => el.title === item.title)===false){
             items.push(item)
          }  
      }
      ); 
      this.arrNnews = items
      this.spinner= false;

    },
    error=>{
      this.mainServices.clearStorageData("userData")
      this.router.navigate(['/']);
      const message = "Unauthorized!";
      const action = "DISMISS";
      this._snackBar.open(message, action, {
        verticalPosition: 'bottom',
        duration: 3000,
        horizontalPosition: 'end', 
        panelClass: ['red-snackbar'],
      });
    }
    )
    //console.log(this.arrNnews)
   }
 
}
