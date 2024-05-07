import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClassroomComponent } from './about-classroom.component';

describe('AboutClassroomComponent', () => {
  let component: AboutClassroomComponent;
  let fixture: ComponentFixture<AboutClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutClassroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
