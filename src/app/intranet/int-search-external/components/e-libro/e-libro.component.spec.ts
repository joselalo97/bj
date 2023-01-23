import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ELibroComponent } from './e-libro.component';

describe('ELibroComponent', () => {
  let component: ELibroComponent;
  let fixture: ComponentFixture<ELibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ELibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ELibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
