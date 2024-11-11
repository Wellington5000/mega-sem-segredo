import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionLoggedResultComponent } from './promotion-logged-result.component';

describe('PromotionLoggedResultComponent', () => {
  let component: PromotionLoggedResultComponent;
  let fixture: ComponentFixture<PromotionLoggedResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionLoggedResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionLoggedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
