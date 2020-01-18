import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salesman, SalesmenService } from "../salesmen/salesmen.service";
import { PerformanceService, PerformanceRecord } from "../performance/performance.service";
import { BasicDialogComponent } from "../basic-dialog/basic-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { calculateSocialBonus, calculateSocialTotalBonus } from "../../../server/controller/BonusCalculator"
import { AuthenticationService } from '../authentication/authentication.service';

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
  released: boolean;
  totalBonus: number;

  // displayed properties
  displayedYears: number[];

  constructor(
    private route: ActivatedRoute,
    private salesmenService: SalesmenService,
    private performanceService: PerformanceService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
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

    this.report.state === 'open' ? this.released = false : this.released = true;

    this.isLoadingYear = false;
  }

  getTotalBonus() {
    return this.report.social.totalBonus + this.report.orders.totalBonus;
  }

  updateReport() {
    this.performanceService.updateReportBySidAndYear(this.sid, this.selectedYear, this.report.remarks, this.report.state);
  }

  toggleReportRelease() {
    this.released === true ? this.report.state = 'released' : this.report.state = 'open';
    this.updateReport();

    this.dialog.open(BasicDialogComponent, {
      width: '250px',
      data: {title: 'Confirmation', content: 'The status has been successfully changed to "' + this.report.state + '".'}
    });
  }

  updateSocial() {
    for (const i in this.report.social.criteria) {
      this.report.social.criteria[i].bonus = calculateSocialBonus(this.report.social.criteria[i]);
    }

    this.report.social.totalBonus = calculateSocialTotalBonus(this.report.social.criteria);
  }

  saveSocial() {
    this.performanceService.updatePerformanceRecordBySidAndYear(this.sid, this.selectedYear, this.report.social.criteria);
  }

  cancelSocial() {
    this.onYearChosen();
  }
}
