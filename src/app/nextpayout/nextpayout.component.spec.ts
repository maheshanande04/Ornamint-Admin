import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextpayoutComponent } from './nextpayout.component';

describe('NextpayoutComponent', () => {
  let component: NextpayoutComponent;
  let fixture: ComponentFixture<NextpayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextpayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextpayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
