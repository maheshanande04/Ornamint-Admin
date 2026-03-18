import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdtdepositComponent } from './usdtdeposit.component';

describe('UsdtdepositComponent', () => {
  let component: UsdtdepositComponent;
  let fixture: ComponentFixture<UsdtdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsdtdepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsdtdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
