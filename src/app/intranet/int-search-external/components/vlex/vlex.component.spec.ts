import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlexComponent } from './vlex.component';

describe('VlexComponent', () => {
  let component: VlexComponent;
  let fixture: ComponentFixture<VlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VlexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
