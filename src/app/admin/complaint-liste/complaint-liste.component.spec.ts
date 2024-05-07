import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListeComponent } from './complaint-liste.component';

describe('ComplaintListeComponent', () => {
  let component: ComplaintListeComponent;
  let fixture: ComponentFixture<ComplaintListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
