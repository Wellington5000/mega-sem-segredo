import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixPaymentComponent } from './pix-payment.component';

describe('PixPaymentComponent', () => {
  let component: PixPaymentComponent;
  let fixture: ComponentFixture<PixPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
