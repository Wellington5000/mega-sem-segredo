import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationTypeSelectionComponent } from './combination-type-selection.component';

describe('CombinationTypeSelectionComponent', () => {
  let component: CombinationTypeSelectionComponent;
  let fixture: ComponentFixture<CombinationTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinationTypeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinationTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
