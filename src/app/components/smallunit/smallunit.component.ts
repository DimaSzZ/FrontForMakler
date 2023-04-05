import {Component, Input} from '@angular/core';
import {Advertising} from "../../api/models/product";
import {data} from "autoprefixer";

@Component({
  selector: 'app-smallunit',
  templateUrl: './smallunit.component.html',
  styleUrls: ['./smallunit.component.css']
})
export class SmallunitComponent {
  @Input() data: Advertising;

  selectPicture(){
    const photo = document.getElementById("pict") as HTMLImageElement;
    if (this.data.Picture == null || this.data.Picture == undefined) {
      photo.src = "assets/pages/1-14.jpg";
      return "assets/pages/1-14.jpg";
    } else {
      photo.src = `${this.data.Picture}`
      return this.data.Picture;
    }
  }
}
