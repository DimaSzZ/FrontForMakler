import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {map, Observable, of} from "rxjs";
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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
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
  file: File
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
    const formData = new FormData();
    formData.append('City', this.selectedCity.CityName);
    formData.append('Heading', this.heading);
    formData.append('Description', this.description || '');
    formData.append('File', this.file, this.file.name);
    formData.append('Phone', this.number);
    formData.append('Price', this.price.toString());
    formData.append('CategoryId', this.selectedCatRowData?.Id || '');
    formData.append('SubCategoryId', this.selectedSubCatRowData?.Id || '');
    formData.append('CityId', this.selectedCity.Id);
    console.log(formData);

    this.http.post<any>('https://localhost:7270/api/admin/ads/append', formData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
