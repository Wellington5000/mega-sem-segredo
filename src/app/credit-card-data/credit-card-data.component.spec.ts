import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDataComponent } from './credit-card-data.component';

describe('CreditCardDataComponent', () => {
  let component: CreditCardDataComponent;
  let fixture: ComponentFixture<CreditCardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
