import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawdetailsComponent } from './withdrawdetails.component';

describe('WithdrawdetailsComponent', () => {
  let component: WithdrawdetailsComponent;
  let fixture: ComponentFixture<WithdrawdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
