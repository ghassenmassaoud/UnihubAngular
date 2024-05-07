import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogLessonComponent } from './form-dialog-Lesson.component';

describe('FormDialogComponent', () => {
  let component: FormDialogLessonComponent;
  let fixture: ComponentFixture<FormDialogLessonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormDialogLessonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
