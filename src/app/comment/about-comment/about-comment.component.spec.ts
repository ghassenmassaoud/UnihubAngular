import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCommentComponent } from './about-comment.component';

describe('AboutCommentComponent', () => {
  let component: AboutCommentComponent;
  let fixture: ComponentFixture<AboutCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
