import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditAbsenceDialogComponent } from './editAbsence.component';

describe('EditAbsenceComponent', () => {
  let component: EditAbsenceDialogComponent;
  let fixture: ComponentFixture<EditAbsenceDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditAbsenceDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
