import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersCard } from './work-orders-card';

describe('WorkOrdersCard', () => {
  let component: WorkOrdersCard;
  let fixture: ComponentFixture<WorkOrdersCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrdersCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkOrdersCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
