import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salesman, SalesmenService } from "../salesmen/salesmen.service";
import {
  PerformanceService,
  PerformanceRecord
} from "../performance/performance.service";

@Component({
  selector: 'app-salesmen-detail',
  templateUrl: './salesmen-detail.component.html',
  styleUrls: ['./salesmen-detail.component.scss']
})
export class SalesmenDetailComponent implements OnInit {
  isLoadingSalesman: boolean = true;
  isLoadingYear: boolean = true;

  salesman: Salesman;
  report: PerformanceRecord;
  sid: number;
  selectedYear: number;
  totalBonus: number;

  // displayed properties
  displayedYears: number[];
  displayedStates: string[] = ['open', 'released'];

  constructor(
    private route: ActivatedRoute,
    private salesmenService: SalesmenService,
    private performanceService: PerformanceService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.isLoadingSalesman = true;
      this.isLoadingYear = true;

      this.sid = +params.get('sid');
      this.salesman = await this.salesmenService.getSalesmanBySid(this.sid);
      this.displayedYears = await this.performanceService.getYearsBySid(this.sid);

      if (this.displayedYears.length == 0) {
        this.displayedYears = [ new Date().getFullYear() ];
      }

      this.isLoadingSalesman = false;

      // select the newest year and fill in the cards
      this.selectedYear = this.displayedYears[0];
      this.onYearChosen();
    });
  }

  async onYearChosen() {
    this.isLoadingYear = true;

    this.report = await this.performanceService.getPerformanceRecordBySidAndYear(this.sid, this.selectedYear);

    this.isLoadingYear = false;
  }

  getTotalBonus() {
    return this.report.social.totalBonus + this.report.orders.totalBonus;
  }

  updateReport() {
    this.performanceService.updateReportBySidAndYear(this.sid, this.selectedYear, this.report.remarks, this.report.state);
  }
}
