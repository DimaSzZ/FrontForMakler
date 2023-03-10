import {Component, ViewChild} from '@angular/core';
import {CellClickedEvent, ColDef, GridReadyEvent} from 'ag-grid-community';
import {catchError, Observable, throwError} from "rxjs";
import {AgGridAngular} from "ag-grid-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-createc',
  templateUrl: './createc.component.html',
  styleUrls: ['./createc.component.scss']
})
export class CreatecComponent {
  columnDefs: ColDef[] = [
    {field: 'Id'},
    {field: 'CityName'}
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  cityName: string
  public rowData$: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {
  }

  onGridReady(params?: GridReadyEvent) {
    this.rowData$ = new Observable<any[]>()
    this.rowData$ = this.http
      .get<any[]>('https://localhost:7270/api/admin/city/get-all');
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

   addCity() {
    let city = {city:this.cityName}
    this.http.post<any>('https://localhost:7270/api/admin/city/append', city)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('An error occurred while adding a city.');
        })
      )
      .subscribe()
     setTimeout(() => this.rowData$ = this.http
       .get<any[]>('https://localhost:7270/api/admin/city/get-all'),1500)
  }
}
