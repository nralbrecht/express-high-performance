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
    salesman: Salesman;
    report: PerformanceRecord;
    sid: number;
    selectedYear: number;
    totalBonus: number;

    // displayed properties
    displayedYears: number[];
    displayedStates: string[] = ['open', 'released'];
    displayedSocialColumns: string[] = ['description', 'targetValue', 'actualValue'];
    displayedOrderColumns: string[] = ['product', 'client', 'ranking', 'items'];

    constructor(
        private route: ActivatedRoute,
        private salesmenService: SalesmenService,
        private performanceService: PerformanceService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(async params => {
            this.sid = +params.get('sid');
            this.salesman = await this.salesmenService.getSalesmanBySid(this.sid);
            this.displayedYears = await this.performanceService.getYearsBySid(this.sid);

            // select the newest year and fill in the cards
            this.selectedYear = this.displayedYears[0];
            this.onYearChosen();
        });
    }

    async onYearChosen(){
        this.report = await this.performanceService.getPerformanceRecordBySidAndYear(this.sid, this.selectedYear);
    }

    getTotalBonus() {
        return this.report.social.totalBonus + this.report.orders.totalBonus;
    }
}
