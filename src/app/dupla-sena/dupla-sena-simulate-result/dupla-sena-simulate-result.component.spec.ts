import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaSenaSimulateResultComponent } from './dupla-sena-simulate-result.component';

describe('DuplaSenaSimulateResultComponent', () => {
  let component: DuplaSenaSimulateResultComponent;
  let fixture: ComponentFixture<DuplaSenaSimulateResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplaSenaSimulateResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplaSenaSimulateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
