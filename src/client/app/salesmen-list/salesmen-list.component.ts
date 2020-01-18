import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Salesman, SalesmenService } from "../salesmen/salesmen.service";

@Component({
  selector: 'app-salesmen-list',
  templateUrl: './salesmen-list.component.html',
  styleUrls: ['./salesmen-list.component.scss']
})
export class SalesmenListComponent implements OnInit {
  elementData: Salesman[];
  dataSource: MatTableDataSource<Salesman>;
  displayedColumns: string[];
  isLoadingSalesmen: boolean = true;

  constructor(
    private salesmenService: SalesmenService) { }

  async ngOnInit() {
    this.isLoadingSalesmen = true;
    this.elementData = await this.salesmenService.getSalesmen();
    this.displayedColumns = ['sid', 'firstName', 'lastName', 'jobTitle'];
    this.dataSource = new MatTableDataSource(this.elementData);
    this.isLoadingSalesmen = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
