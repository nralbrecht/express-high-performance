import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmenListComponent } from './salesmen-list.component';

describe('SalesmenListComponent', () => {
  let component: SalesmenListComponent;
  let fixture: ComponentFixture<SalesmenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
