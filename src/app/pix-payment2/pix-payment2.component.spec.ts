import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixPayment2Component } from './pix-payment2.component';

describe('PixPayment2Component', () => {
  let component: PixPayment2Component;
  let fixture: ComponentFixture<PixPayment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixPayment2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixPayment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
