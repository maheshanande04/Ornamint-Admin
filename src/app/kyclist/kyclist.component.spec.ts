import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyclistComponent } from './kyclist.component';

describe('KyclistComponent', () => {
  let component: KyclistComponent;
  let fixture: ComponentFixture<KyclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KyclistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KyclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
