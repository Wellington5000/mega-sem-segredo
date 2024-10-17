import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionResultComponent } from './promotion-result.component';

describe('PromotionResultComponent', () => {
  let component: PromotionResultComponent;
  let fixture: ComponentFixture<PromotionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
