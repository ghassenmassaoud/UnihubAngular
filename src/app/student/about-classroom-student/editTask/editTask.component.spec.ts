import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditTaskDialogComponent } from './editTask.component';

describe('EditTaskComponent', () => {
  let component: EditTaskDialogComponent;
  let fixture: ComponentFixture<EditTaskDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditTaskDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
