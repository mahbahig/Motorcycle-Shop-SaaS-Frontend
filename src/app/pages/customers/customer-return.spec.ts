import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReturn } from './customer-return';

describe('CustomerReturn', () => {
  let component: CustomerReturn;
  let fixture: ComponentFixture<CustomerReturn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerReturn],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerReturn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
