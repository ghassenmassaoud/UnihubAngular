import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComplaintDialogComponent } from './delete-complaint-dialog.component';

describe('DeleteComplaintDialogComponent', () => {
  let component: DeleteComplaintDialogComponent;
  let fixture: ComponentFixture<DeleteComplaintDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteComplaintDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteComplaintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
