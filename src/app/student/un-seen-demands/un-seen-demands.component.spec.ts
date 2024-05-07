import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSeenDemandsComponent } from './un-seen-demands.component';

describe('UnSeenDemandsComponent', () => {
  let component: UnSeenDemandsComponent;
  let fixture: ComponentFixture<UnSeenDemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnSeenDemandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnSeenDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
