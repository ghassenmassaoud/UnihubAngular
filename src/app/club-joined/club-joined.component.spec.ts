import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubJoinedComponent } from './club-joined.component';

describe('ClubJoinedComponent', () => {
  let component: ClubJoinedComponent;
  let fixture: ComponentFixture<ClubJoinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubJoinedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
