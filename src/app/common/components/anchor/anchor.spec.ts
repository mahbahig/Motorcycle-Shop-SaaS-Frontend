import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anchor } from './anchor';

describe('Anchor', () => {
  let component: Anchor;
  let fixture: ComponentFixture<Anchor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anchor],
    }).compileComponents();

    fixture = TestBed.createComponent(Anchor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
