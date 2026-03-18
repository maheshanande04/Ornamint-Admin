import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdtwithdrawComponent } from './usdtwithdraw.component';

describe('UsdtwithdrawComponent', () => {
  let component: UsdtwithdrawComponent;
  let fixture: ComponentFixture<UsdtwithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsdtwithdrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsdtwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
