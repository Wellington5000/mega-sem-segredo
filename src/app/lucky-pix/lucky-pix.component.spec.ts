import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyPixComponent } from './lucky-pix.component';

describe('LuckyPixComponent', () => {
  let component: LuckyPixComponent;
  let fixture: ComponentFixture<LuckyPixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuckyPixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyPixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
