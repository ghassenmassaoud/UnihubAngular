import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassrromStudentComponent } from './list-classrrom-student.component';

describe('ListClassrromStudentComponent', () => {
  let component: ListClassrromStudentComponent;
  let fixture: ComponentFixture<ListClassrromStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClassrromStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListClassrromStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
