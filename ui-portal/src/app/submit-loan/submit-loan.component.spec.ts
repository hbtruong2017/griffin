import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLoanComponent } from './submit-loan.component';

describe('SubmitLoanComponent', () => {
  let component: SubmitLoanComponent;
  let fixture: ComponentFixture<SubmitLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
