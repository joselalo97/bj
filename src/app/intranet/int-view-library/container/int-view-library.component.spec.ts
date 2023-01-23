import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntViewLibraryComponent } from './int-view-library.component';

describe('IntViewLibraryComponent', () => {
  let component: IntViewLibraryComponent;
  let fixture: ComponentFixture<IntViewLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntViewLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntViewLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
