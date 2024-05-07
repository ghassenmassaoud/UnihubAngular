import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogAbsenceComponent } from './form-dialog-Absence.component';

describe('FormDialogComponent', () => {
  let component: FormDialogAbsenceComponent;
  let fixture: ComponentFixture<FormDialogAbsenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormDialogAbsenceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
