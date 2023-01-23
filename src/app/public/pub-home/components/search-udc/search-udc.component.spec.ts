import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUdcComponent } from './search-udc.component';

describe('SearchUdcComponent', () => {
  let component: SearchUdcComponent;
  let fixture: ComponentFixture<SearchUdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUdcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
