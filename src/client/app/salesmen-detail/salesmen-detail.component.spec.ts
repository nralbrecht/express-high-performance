import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmenDetailComponent } from './salesmen-detail.component';

describe('SalesmenDetailComponent', () => {
  let component: SalesmenDetailComponent;
  let fixture: ComponentFixture<SalesmenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
