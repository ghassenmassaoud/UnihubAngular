import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresesListComponent } from './coureses-list.component';

describe('CouresesListComponent', () => {
  let component: CouresesListComponent;
  let fixture: ComponentFixture<CouresesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouresesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouresesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
