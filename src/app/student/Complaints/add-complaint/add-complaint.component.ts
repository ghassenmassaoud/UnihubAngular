import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ComplaintService } from '../ComplaintService';
import { ComplaintType } from '../ComplaintType';
import { Complaint } from '../Complaint';

@Component({
  selector: 'app-add-complaint',
  standalone: true,
  templateUrl: './add-complaint.component.html',
  styleUrl: './add-complaint.component.scss',
  imports: [
    BreadcrumbComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule
  ],
})
export class AddComplaintComponent {

  complaintForm!: FormGroup;
  complaintType: string[] = ['GRADE','ABSENCE','TEACHER','CLASS'];

  breadscrums = [
    {
      title: 'ADD COMPLAINT',
      items: ['student'],
      active: 'ADD COMPLAINT',
    },
  ];

  constructor(private complaintservice: ComplaintService, private fb: FormBuilder) {
    this.complaintForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      complaintType: [ComplaintType, [Validators.required]]    
    });
  }
  
  onSubmit(): void {
    if (this.complaintForm.valid) {
      const formValue = this.complaintForm.value;
      const complaint: Complaint = {
        complaintId: 0, 
        title: formValue.title,
        description: formValue.description,
        complaintType: formValue.complaintType as ComplaintType, 
        status: false 
      };

      this.complaintservice.addComplaint(complaint).subscribe({
        next: (response) => {
          console.log('complaint added successfully:', response);
          // Reset form after adding
          this.complaintForm.reset();
          // Refresh the page
          window.location.reload();
        },
        error: (error) => {
          console.error('Error adding Complaint:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}