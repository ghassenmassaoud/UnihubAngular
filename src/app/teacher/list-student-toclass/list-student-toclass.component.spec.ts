import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentToclassComponent } from './list-student-toclass.component';

describe('ListStudentToclassComponent', () => {
  let component: ListStudentToclassComponent;
  let fixture: ComponentFixture<ListStudentToclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStudentToclassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListStudentToclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
