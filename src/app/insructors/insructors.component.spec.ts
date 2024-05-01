import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsructorsComponent } from './insructors.component';

describe('InsructorsComponent', () => {
  let component: InsructorsComponent;
  let fixture: ComponentFixture<InsructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsructorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
