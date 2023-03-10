import {Component, OnInit} from '@angular/core';
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface City {
  Id: string;
  CityName: string;
}

interface catValue {
  Id: string
  CategoryProduct: string
}

interface subValue {
  Id: string
  SubCategoryProduct: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.http.get<City[]>('https://localhost:7270/api/admin/city/get-all').subscribe(
      cities => this.cities = cities
    );
  }

  constructor(private http: HttpClient) {
  }

  columnCategoryDefs: ColDef[] = [
    {field: 'Id'},
    {field: 'CategoryProduct'}
  ];
  columnSubCategoryDefs: ColDef[] = [
    {field: 'Id'},
    {field: 'SubCategoryProduct'}
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  heading: string
  description: string
  number: string
  selectedCity: City
  price: string
  file: File | null
  cities: City[] = [];
  selectedCatRowData: catValue | undefined
  selectedSubCatRowData: subValue | undefined
  catId: string
  subCatId: string
  CategoryProduct: string
  SubCategoryProduct: string
  public rowData$: Observable<any[]>;
  public rowData2$: Observable<any[]> = of([]);

  onCategoryGridReady(params?: GridReadyEvent) {
    this.rowData$ = this.http
      .get<catValue[]>('https://localhost:7270/api/admin/category/get-all');
  }

  onCategoryRowCatClicked(event: any): void {
    this.selectedCatRowData = event.data
    if (this.selectedCatRowData?.Id != undefined && "CategoryProduct" in this.selectedCatRowData && this.selectedCatRowData?.CategoryProduct != undefined) {
      this.catId = this.selectedCatRowData?.Id.toString()
      this.CategoryProduct = this.selectedCatRowData?.CategoryProduct.toString()

      this.http.get<subValue[]>(`https://localhost:7270/api/admin/sub-category/get-all/${this.selectedCatRowData.Id.toString()}`)
        .pipe(
          map(data => {
            // transform the response data into an Observable that emits the response data
            return of(data);
          })
        )
        .subscribe(dataObservable => {
          this.rowData2$ = dataObservable;
        });

    }
  }

  onSubCategoryRowCatClicked(event: any): void {
    this.selectedSubCatRowData = event.data
    if (this.selectedSubCatRowData?.Id != undefined && "SubCategoryProduct" in this.selectedSubCatRowData && this.selectedSubCatRowData?.SubCategoryProduct != undefined) {
      this.subCatId = this.selectedSubCatRowData?.Id.toString()
      this.SubCategoryProduct = this.selectedSubCatRowData?.SubCategoryProduct.toString()
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  AddAd() {

  }
}
