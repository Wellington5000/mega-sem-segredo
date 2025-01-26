import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateResultComponent } from './simulate-result.component';

describe('SimulateResultComponent', () => {
  let component: SimulateResultComponent;
  let fixture: ComponentFixture<SimulateResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
