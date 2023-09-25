import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGlobalComponent } from './list-global.component';

describe('ListGlobalComponent', () => {
  let component: ListGlobalComponent;
  let fixture: ComponentFixture<ListGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListGlobalComponent]
    });
    fixture = TestBed.createComponent(ListGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
