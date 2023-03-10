import {Component, ViewChild} from '@angular/core';
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {catchError, filter, map, Observable, of, throwError} from "rxjs";
import {AgGridAngular} from "ag-grid-angular";
import {HttpClient, HttpParams} from "@angular/common/http";

interface gridValue {
  Id: string
  CityName: string
}

@Component({
  selector: 'app-deletec',
  templateUrl: './deletec.component.html',
  styleUrls: ['./deletec.component.scss']
})

export class DeletecComponent {

  columnDefs: ColDef[] = [
    {field: 'Id'},
    {field: 'CityName'}
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  selectedRowData: gridValue | undefined

  public rowData$: Observable<gridValue[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {
  }

  onGridReady(params?: GridReadyEvent) {
    this.rowData$ = new Observable<gridValue[]>()
    this.rowData$ = this.http
      .get<gridValue[]>('https://localhost:7270/api/admin/city/get-all');
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  onRowClicked(event: any): void {
    if (event.data?.Id) {
      this.selectedRowData = event.data;
    } else {
      this.selectedRowData = undefined;
    }
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  deleteCity() {
    this.rowData$.pipe(
      filter(data => !!data),
      map(data => data.filter(row => row !== this.selectedRowData))
    ).subscribe(newData => {
      this.rowData$ = of(newData);
      this.agGrid.api.setRowData(newData);
      this.clearSelection();
    });
    if (!this.selectedRowData) {
      return;
    }

    const params = new HttpParams().set('id', this.selectedRowData.Id.toString());

    this.http.delete<any>('https://localhost:7270/api/admin/city/delete', { params })
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('An error occurred while deleting the city.');
        })
      )
      .subscribe();
    setTimeout(() => this.rowData$ = this.http
      .get<any[]>('https://localhost:7270/api/admin/city/get-all'),1500);
  }
}
