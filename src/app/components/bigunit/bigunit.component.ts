import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Advertising} from "../../api/models/product";

@Component({
  selector: 'app-bigunit',
  templateUrl: './bigunit.component.html',
  styleUrls: ['./bigunit.component.css']
})
export class BigunitComponent implements OnInit {
  Id: string;
  ad: Advertising;

  constructor(private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.Id = params['Id'];

      this.http.get<Advertising>(`https://localhost:7270/api/search/SearchId/${this.Id}`).subscribe(
        (response: Advertising) => this.ad = response
      );
    });
  }
  selectPicture(){
    const photo = document.getElementById("pict") as HTMLImageElement;
    if (this.ad.Picture == null || this.ad.Picture == undefined) {
      photo.src = "assets/pages/1-14.jpg";
      return "assets/pages/1-14.jpg";
    } else {
      photo.src = `${this.ad.Picture}`
      return this.ad.Picture;
    }
  }
}
