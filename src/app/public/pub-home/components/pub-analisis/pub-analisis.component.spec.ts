import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubAnalisisComponent } from './pub-analisis.component';

describe('PubAnalisisComponent', () => {
  let component: PubAnalisisComponent;
  let fixture: ComponentFixture<PubAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
