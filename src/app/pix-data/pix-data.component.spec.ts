import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixDataComponent } from './pix-data.component';

describe('PixDataComponent', () => {
  let component: PixDataComponent;
  let fixture: ComponentFixture<PixDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
