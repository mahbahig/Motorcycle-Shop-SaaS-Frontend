import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WokFlowCard } from './wok-flow-card';

describe('WokFlowCard', () => {
  let component: WokFlowCard;
  let fixture: ComponentFixture<WokFlowCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WokFlowCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WokFlowCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
