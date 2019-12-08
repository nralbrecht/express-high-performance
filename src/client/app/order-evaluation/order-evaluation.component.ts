import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { OrderService, OrderEvaluation } from "../order/order.service";

@Component({
  selector: 'app-order-evaluation',
  templateUrl: './order-evaluation.component.html',
  styleUrls: ['./order-evaluation.component.scss']
})
export class OrderEvaluationComponent implements OnInit {

    @Input() sid: number;
    @Input() year: number;

    orders: OrderEvaluation;

    constructor(private orderService: OrderService) { }

    async ngOnInit() {
        this.orders = await this.orderService.getOrdersBySidAndYear(this.sid, this.year);
    }
}
