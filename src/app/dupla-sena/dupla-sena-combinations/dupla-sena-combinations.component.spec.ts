import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaSenaCombinationsComponent } from './dupla-sena-combinations.component';

describe('DuplaSenaCombinationsComponent', () => {
  let component: DuplaSenaCombinationsComponent;
  let fixture: ComponentFixture<DuplaSenaCombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplaSenaCombinationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplaSenaCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
