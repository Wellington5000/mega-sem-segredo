import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaSenaSimulateComponent } from './dupla-sena-simulate.component';

describe('DuplaSenaSimulateComponent', () => {
  let component: DuplaSenaSimulateComponent;
  let fixture: ComponentFixture<DuplaSenaSimulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplaSenaSimulateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplaSenaSimulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
