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
  selector: 'app-deletecs',
  templateUrl: './deletecs.component.html',
  styleUrls: ['./deletecs.component.scss']
})
export class DeletecsComponent {
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

  selectedCatRowData: catValue  | undefined = undefined
  selectedSubCatRowData: subValue  | undefined = undefined
  catId: string
  subCatId: string

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
    }
  }

  deleteCategoryOrSubCategory() {
    if(this.selectedSubCatRowData != undefined){
      this.http.delete<any>(`https://localhost:7270/api/admin/sub-category/delete/${this.subCatId}`)
        .pipe(
          catchError(error => {
            console.error(error);
            return throwError('An error occurred while update a subCategory.');
          })
        )
        .subscribe(
          this.selectedSubCatRowData = undefined
        )
    }
    this.http.delete<any>(`https://localhost:7270/api/admin/category/delete/${this.catId}`)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('An error occurred while update a category.');
        })
      )
      .subscribe()
    setTimeout(() => this.rowData$ = this.http
      .get<any[]>('https://localhost:7270/api/admin/category/get-all'),1000)
  }
}
