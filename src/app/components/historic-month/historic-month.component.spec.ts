import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricMonthComponent } from './historic-month.component';

describe('HistoricMonthComponent', () => {
  let component: HistoricMonthComponent;
  let fixture: ComponentFixture<HistoricMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
