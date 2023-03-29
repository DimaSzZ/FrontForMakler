import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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
export class AppComponent  {
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
  }
  subcategoriesByCategory: Record<string, SubCategory[]> = {};
  categories : Category[] = [];
  showSubcategories: Record<string, boolean> = {};

  toggleSubcategories(categoryId:string){
    this.showSubcategories[categoryId] = !this.showSubcategories[categoryId];
  }
}
