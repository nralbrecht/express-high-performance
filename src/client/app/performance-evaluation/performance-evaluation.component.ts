import { Component, Input } from '@angular/core';
import { SocialCriterion } from '../performance/performance.service';

@Component({
  selector: 'app-performance-evaluation',
  templateUrl: './performance-evaluation.component.html',
  styleUrls: ['./performance-evaluation.component.scss']
})
export class PerformanceEvaluationComponent {
  @Input() social: SocialCriterion[];
  @Input() totalBonus: number;

  displayedColumns: string[] = ['description', 'targetValue', 'actualValue', 'bonus'];
}
