import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSpaceComponent } from './resource-space.component';

describe('ResourceSpaceComponent', () => {
  let component: ResourceSpaceComponent;
  let fixture: ComponentFixture<ResourceSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
