import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaSenaCombinationComponent } from './dupla-sena-combination.component';

describe('DuplaSenaCombinationComponent', () => {
  let component: DuplaSenaCombinationComponent;
  let fixture: ComponentFixture<DuplaSenaCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplaSenaCombinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplaSenaCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
