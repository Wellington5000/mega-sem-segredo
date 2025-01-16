import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplaSenaComponent } from './dupla-sena.component';

describe('DuplaSenaComponent', () => {
  let component: DuplaSenaComponent;
  let fixture: ComponentFixture<DuplaSenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplaSenaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplaSenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
