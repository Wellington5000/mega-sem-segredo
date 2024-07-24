import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetScorerComponent } from './bet-scorer.component';

describe('BetScorerComponent', () => {
  let component: BetScorerComponent;
  let fixture: ComponentFixture<BetScorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetScorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetScorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
