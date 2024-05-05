import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditLessonDialogComponent } from './editLesson.component';

describe('EditLessonComponent', () => {
  let component: EditLessonDialogComponent;
  let fixture: ComponentFixture<EditLessonDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditLessonDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
