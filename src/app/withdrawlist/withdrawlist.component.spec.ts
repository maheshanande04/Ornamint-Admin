import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlistComponent } from './withdrawlist.component';

describe('WithdrawlistComponent', () => {
  let component: WithdrawlistComponent;
  let fixture: ComponentFixture<WithdrawlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
