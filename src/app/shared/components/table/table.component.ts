import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Table } from '../../model/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, CommonModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() table: Table<any> = { rows: [], columns: [] };
  @Input() tableTitle: string | null = null;
  @Input() tableFooterCountTitle: string | null = null;
  @Input() loading = false;

  @Input() paginator = false;
  @Input() totalRecords = 0;  
  @Input() rowsPerPage = 10;  
  @Input() first = 0; 

  @Input() sortField : string | undefined;
  @Input() sortOrder = 1;  

  @Output() totalRecordsChange = new EventEmitter<number>();  
  @Output() rowsPerPageChange = new EventEmitter<number>();  
  @Output() firstChange = new EventEmitter<number>();
  @Output() pageChangeTable = new EventEmitter<any>(); 

  @Output() sortFieldChange = new EventEmitter<string>();
  @Output() sortOrderChange = new EventEmitter<number>();
  @Output() sortChangeTable = new EventEmitter<any>(); 


  selectedItems: any [] = [];

  pageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
  
    // Emit changes back to the parent
    this.firstChange.emit(this.first);
    this.rowsPerPageChange.emit(this.rowsPerPage);
    this.totalRecordsChange.emit(this.totalRecords); 
    this.pageChangeTable.emit({
      "first": this.first,
      "totalRecords": this.totalRecords,
      "rowsPerPage": this.rowsPerPage,
      "sortField": this.sortField,
      "sortOrder": this.sortOrder
    });
  }


  selectItem(rowData: any) {
    console.log(rowData);
  }

  onSort(event: any) {
    console.log(event);
    this.sortField = event.field;
    this.sortOrder = event.order;

    this.sortFieldChange.emit(this.sortField);
    this.sortOrderChange.emit(this.sortOrder);
    this.sortChangeTable.emit({
      "first": this.first,
      "totalRecords": this.totalRecords,
      "rowsPerPage": this.rowsPerPage,
      "sortField": this.sortField,
      "sortOrder": this.sortOrder
    })

  }

  

}
