import { Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Advertising} from "./api/models/product";

interface City {
  Id: string;
  CityName: string;
}
interface Search{
  heading?:string,
  category?:string,
  subCategory?:string,
  city?:string
}
interface Category{
  Id:string,
  CategoryProduct:string
}
interface SubCategory{
  Id:string,
  CategoryId:string
  SubCategoryProduct:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public router: Router, private http:HttpClient) {
    this.http.get<Category[]>('https://localhost:7270/api/admin/category/get-all')
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        categories.forEach(cat => {
          this.http.get<SubCategory[]>(`https://localhost:7270/api/admin/sub-category/get-all/${cat.Id}`)
            .subscribe((subcategories: SubCategory[]) => {
              this.subcategoriesByCategory[cat.Id] = subcategories;
            });
        });
      });
    this.http.get<City[]>('https://localhost:7270/api/admin/city/get-all').subscribe(
      cities => this.cities = cities
    );
    this.http.post<any>("https://localhost:7270/api/search",this.SearchRequest).subscribe(
      (response:Advertising[])=>this.Ads = response)
  }
  ngOnInit():void {
      window.addEventListener('popstate', () => {
        this.showBigUnit = false;
      });
  }

  showBigUnit: boolean;

  Ads:Advertising[] = []
  selectedCity: City
  cities: City[] = []
  subcategoriesByCategory: Record<string, SubCategory[]> = {};
  categories : Category[] = [];
  showSubcategories: Record<string, boolean> = {};
  SearchRequest:Search = {}
  heading?:string
  navigateToBigUnit(adId: string) {
    this.router.navigateByUrl(`/big-unit/${adId}`);
  }

  toggleSubcategories(categoryId:string){
    this.showSubcategories[categoryId] = !this.showSubcategories[categoryId];
  }
  AddCatSub(catId:string,subCatId?:string){
      this.SearchRequest.category = catId
      this.SearchRequest.subCategory = subCatId
  }
  SearchBut(){
    this.SearchRequest.heading = this.heading
    this.SearchRequest.city = this.selectedCity?.CityName ?? null;
    this.http.post<any>("https://localhost:7270/api/search",this.SearchRequest).subscribe(
      (response:Advertising[])=>this.Ads = response)
  }
}
