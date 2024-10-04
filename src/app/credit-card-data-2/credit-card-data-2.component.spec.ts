import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardData2Component } from './credit-card-data-2.component';

describe('CreditCardData2Component', () => {
  let component: CreditCardData2Component;
  let fixture: ComponentFixture<CreditCardData2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardData2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardData2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
