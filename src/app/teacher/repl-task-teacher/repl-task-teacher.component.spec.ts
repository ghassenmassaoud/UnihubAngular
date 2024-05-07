import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplTaskTeacherComponent } from './repl-task-teacher.component';

describe('ReplTaskTeacherComponent', () => {
  let component: ReplTaskTeacherComponent;
  let fixture: ComponentFixture<ReplTaskTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplTaskTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplTaskTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
