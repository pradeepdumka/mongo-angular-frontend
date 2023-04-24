import { Component } from '@angular/core';

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss']
})
export class AboutDetailsComponent {
count =0;
incrementValue(){
  this.count++
}
deincrementValue(){
  this.count--
}
}
