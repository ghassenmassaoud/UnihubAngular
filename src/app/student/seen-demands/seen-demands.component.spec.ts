import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenDemandsComponent } from './seen-demands.component';

describe('SeenDemandsComponent', () => {
  let component: SeenDemandsComponent;
  let fixture: ComponentFixture<SeenDemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeenDemandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeenDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
