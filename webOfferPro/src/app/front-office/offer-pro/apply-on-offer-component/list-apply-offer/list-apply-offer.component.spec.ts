import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplyOfferComponent } from './list-apply-offer.component';

describe('ListApplyOfferComponent', () => {
  let component: ListApplyOfferComponent;
  let fixture: ComponentFixture<ListApplyOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListApplyOfferComponent]
    });
    fixture = TestBed.createComponent(ListApplyOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
