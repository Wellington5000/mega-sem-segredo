import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckHitsComponent } from './check-hits.component';

describe('CheckHitsComponent', () => {
  let component: CheckHitsComponent;
  let fixture: ComponentFixture<CheckHitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckHitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
