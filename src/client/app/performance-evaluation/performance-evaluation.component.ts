import { Component, Input, Output } from '@angular/core';
import { SocialCriterion } from '../performance/performance.service';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-performance-evaluation',
  templateUrl: './performance-evaluation.component.html',
  styleUrls: ['./performance-evaluation.component.scss']
})
export class PerformanceEvaluationComponent {
  @Input() social: SocialCriterion[];
  @Input() totalBonus: number;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['description', 'targetValue', 'actualValue', 'bonus'];

  editMode: boolean = false;

  constructor(
    private authenticationService: AuthenticationService) { }

  updatedSocialEvaluation() {
    this.update.emit();
  }

  enableEditMode() {
    this.editMode = true;
  }

  saveEdit() {
    this.editMode = false;

    this.save.emit();
    this.updatedSocialEvaluation();
  }

  cancelEdit() {
    this.editMode = false;

    this.cancel.emit();
    this.updatedSocialEvaluation();
  }

}
