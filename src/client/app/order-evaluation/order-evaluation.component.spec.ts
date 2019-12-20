import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEvaluationComponent } from './order-evaluation.component';

describe('OrderEvaluationComponent', () => {
  let component: OrderEvaluationComponent;
  let fixture: ComponentFixture<OrderEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
