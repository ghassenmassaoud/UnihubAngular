import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresesSingleComponent } from './coureses-single.component';

describe('CouresesSingleComponent', () => {
  let component: CouresesSingleComponent;
  let fixture: ComponentFixture<CouresesSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouresesSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouresesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
