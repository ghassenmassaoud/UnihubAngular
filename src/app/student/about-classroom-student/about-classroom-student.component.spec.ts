import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClassroomStudentComponent } from './about-classroom-student.component';

describe('AboutClassroomStudentComponent', () => {
  let component: AboutClassroomStudentComponent;
  let fixture: ComponentFixture<AboutClassroomStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutClassroomStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutClassroomStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
