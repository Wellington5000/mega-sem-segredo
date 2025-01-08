import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationsComponent } from './combinations.component';

describe('CombinationsComponent', () => {
  let component: CombinationsComponent;
  let fixture: ComponentFixture<CombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
