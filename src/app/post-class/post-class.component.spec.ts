import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostClassComponent } from './post-class.component';

describe('PostClassComponent', () => {
  let component: PostClassComponent;
  let fixture: ComponentFixture<PostClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
