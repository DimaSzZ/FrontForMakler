import {Component, ViewChild} from '@angular/core';
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {AgGridAngular} from "ag-grid-angular";
import {HttpClient} from "@angular/common/http";

interface catValue{
  Id: string
  CategoryProduct : string
}
interface subValue{
  Id: string
  SubCategoryProduct : string
}
@Component({
  selector: 'app-updatecs',
  templateUrl: './updatecs.component.html',
  styleUrls: ['./updatecs.component.scss']
})
export class UpdatecsComponent {
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

  selectedCatRowData: catValue  | undefined
  selectedSubCatRowData: subValue  | undefined
  catId: string
  subCatId: string
  CategoryProduct: string
  SubCategoryProduct: string
  public rowData$: Observable<any[]>;
  public rowData2$: Observable<any[]> = of([]);

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {
  }

  onCategoryGridReady(params?: GridReadyEvent) {
    this.rowData$ = this.http
      .get<catValue[]>('https://localhost:7270/api/admin/category/get-all');
  }

  onSubCategoryGridReady(params?: GridReadyEvent) {

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

  updateCategoryOrSubCategory() {
    let category = { category: this.CategoryProduct,
      id: this.catId}
    this.http.put<any>('https://localhost:7270/api/admin/category/update', category)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('An error occurred while update a category.');
        })
      )
      .subscribe()
    setTimeout(() => this.rowData$ = this.http
      .get<any[]>('https://localhost:7270/api/admin/category/get-all'),1000)

    if (this.SubCategoryProduct != "" && this.subCatId !="") {
      let subCategory = {
        categoryId: this.catId,
        subCategoryId: this.subCatId,
        newName: this.SubCategoryProduct
      }
      console.log(subCategory)
      this.http.put<any>('https://localhost:7270/api/admin/sub-category/update', JSON.stringify(subCategory), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .pipe(
          catchError(error => {
            console.error(error);
            return throwError('An error occurred while update a subCategory.');
          })
        )
        .subscribe()
    }
  }
}
