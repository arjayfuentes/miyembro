import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Table } from '../../model/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() table: Table<any> = { rows: [], columns: [] };
  @Input() tableTitle: string | null = null;

}
