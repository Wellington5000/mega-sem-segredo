import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotterySelectionComponent } from './lottery-selection.component';

describe('LotterySelectionComponent', () => {
  let component: LotterySelectionComponent;
  let fixture: ComponentFixture<LotterySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotterySelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotterySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
