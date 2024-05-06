import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPostsComponent } from './user-details-posts.component';

describe('UserDetailsPostsComponent', () => {
  let component: UserDetailsPostsComponent;
  let fixture: ComponentFixture<UserDetailsPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailsPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
