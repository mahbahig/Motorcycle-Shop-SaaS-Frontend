import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAlertCard } from './storage-alert-card';

describe('StorageAlertCard', () => {
  let component: StorageAlertCard;
  let fixture: ComponentFixture<StorageAlertCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageAlertCard],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageAlertCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
