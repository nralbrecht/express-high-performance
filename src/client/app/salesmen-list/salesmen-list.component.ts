import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalesmenService } from "../salesmen/salesmen.service";


@Component({
  selector: 'app-salesmen-list',
  templateUrl: './salesmen-list.component.html',
  styleUrls: ['./salesmen-list.component.scss']
})
export class SalesmenListComponent {
  salesmenService = new SalesmenService();
  dataSource;
  elementData;
  displayedColumns: string[];

constructor() {
    this.initt();
}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async initt() {
      this.elementData = await this.salesmenService.getSalesmen();
      this.displayedColumns = ['sid', 'firstName', 'lastName', 'jobTitle'];
      this.dataSource = new MatTableDataSource(this.elementData);
  }
}
