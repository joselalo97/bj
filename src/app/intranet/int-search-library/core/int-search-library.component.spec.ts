import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntSearchLibraryComponent } from './int-search-library.component';

describe('IntSearchLibraryComponent', () => {
  let component: IntSearchLibraryComponent;
  let fixture: ComponentFixture<IntSearchLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntSearchLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntSearchLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
