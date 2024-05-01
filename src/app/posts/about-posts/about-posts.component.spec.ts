import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPostsComponent } from './about-posts.component';

describe('AboutPostsComponent', () => {
  let component: AboutPostsComponent;
  let fixture: ComponentFixture<AboutPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
