import { Component, Input } from '@angular/core';
import { Order } from '../order/order.service';

@Component({
  selector: 'app-order-evaluation',
  templateUrl: './order-evaluation.component.html',
  styleUrls: ['./order-evaluation.component.scss']
})
export class OrderEvaluationComponent {
  @Input() orders: Order[];
  @Input() totalBonus: number;

  displayedColumns: string[] = ['product', 'client', 'ranking', 'items'];
}
