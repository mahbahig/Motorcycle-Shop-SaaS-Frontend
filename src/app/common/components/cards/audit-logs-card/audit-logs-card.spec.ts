import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogsCard } from './audit-logs-card';

describe('AuditLogsCard', () => {
  let component: AuditLogsCard;
  let fixture: ComponentFixture<AuditLogsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditLogsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditLogsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
