import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecondeComponent } from './home-seconde.component';

describe('HomeSecondeComponent', () => {
  let component: HomeSecondeComponent;
  let fixture: ComponentFixture<HomeSecondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSecondeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSecondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
