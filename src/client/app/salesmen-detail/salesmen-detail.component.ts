import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salesmen-detail',
  templateUrl: './salesmen-detail.component.html',
  styleUrls: ['./salesmen-detail.component.scss']
})
export class SalesmenDetailComponent implements OnInit {
    salesman;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.salesman = +params.get('sid');
        });
    }
}
