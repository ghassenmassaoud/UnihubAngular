import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPostsComponent } from './user-add-posts.component';

describe('UserAddPostsComponent', () => {
  let component: UserAddPostsComponent;
  let fixture: ComponentFixture<UserAddPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAddPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
