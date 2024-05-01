import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresesRightSideBarComponent } from './coureses-right-side-bar.component';

describe('CouresesRightSideBarComponent', () => {
  let component: CouresesRightSideBarComponent;
  let fixture: ComponentFixture<CouresesRightSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouresesRightSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouresesRightSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
