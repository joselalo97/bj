import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudocComponent } from './hudoc.component';

describe('HudocComponent', () => {
  let component: HudocComponent;
  let fixture: ComponentFixture<HudocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HudocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HudocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
