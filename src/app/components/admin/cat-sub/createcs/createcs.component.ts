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
  selector: 'app-createcs',
  templateUrl: './createcs.component.html',
  styleUrls: ['./createcs.component.scss']
})
export class CreatecsComponent {
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

  selectedRowData: catValue | subValue | undefined
  catId: string
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

  onRowCatClicked(event: any): void {
    this.selectedRowData = event.data
    if (this.selectedRowData?.Id != undefined && "CategoryProduct" in this.selectedRowData && this.selectedRowData?.CategoryProduct != undefined) {
      this.catId = this.selectedRowData?.Id.toString()
      this.CategoryProduct = this.selectedRowData?.CategoryProduct.toString()

      this.http.get<subValue[]>(`https://localhost:7270/api/admin/sub-category/get-all/${this.selectedRowData.Id.toString()}`)
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

  addCategoryOrSubCategory() {
    let category = { category: this.CategoryProduct }
    this.http.post<any>('https://localhost:7270/api/admin/category/append', category)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('An error occurred while adding a category.');
        })
      )
      .subscribe()
    setTimeout(() => this.rowData$ = this.http
      .get<any[]>('https://localhost:7270/api/admin/category/get-all'),1000)
    if (this.SubCategoryProduct != null) {
      let subCategory = {
        idCategory: this.catId,
        subCategory: this.SubCategoryProduct
      }
      this.http.post<any>('https://localhost:7270/api/admin/sub-category/append', JSON.stringify(subCategory), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .pipe(
          catchError(error => {
            console.error(error);
            return throwError('An error occurred while adding a subCategory.');
          })
        )
        .subscribe()
    }
  }
}
