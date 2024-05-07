import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogTaskComponent } from './form-dialog-Task.component';

describe('FormDialogComponent', () => {
  let component: FormDialogTaskComponent;
  let fixture: ComponentFixture<FormDialogTaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormDialogTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
