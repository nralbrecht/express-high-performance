import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Salesman {
  sid: number;
  firstName: string;
  lastName: string;
}

const ELEMENT_DATA: Salesman[] = [
    { sid: 90123, firstName: 'Max', lastName: 'Musterman' },
    { sid: 90321, firstName: 'Jenny', lastName: 'Angelwitz' },
    { sid: 91337, firstName: 'Nils', lastName: 'Albrecht' },
];

const dataSource = new MatTableDataSource(ELEMENT_DATA);

@Component({
  selector: 'app-salesmen-list',
  templateUrl: './salesmen-list.component.html',
  styleUrls: ['./salesmen-list.component.scss']
})
export class SalesmenListComponent {
  displayedColumns: string[] = ['sid', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
