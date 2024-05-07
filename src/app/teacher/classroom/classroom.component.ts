import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { Classroom } from 'app/models/Classroom';
import { User } from 'app/models/User';
import { ClassroomService } from 'app/services/classroom.service';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule,
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss'
})
export class ClassroomComponent {
  courseForm: FormGroup;
  breadscrums = [
    {
      title: 'Add Classroom',
      items: ['Classroom'],
      active: 'Add Classroom',
    },
  ];
  classroom: Classroom = new Classroom();
  teacher: User = new User();

  constructor(private classroomService: ClassroomService, private fb: FormBuilder) {
    let IdUser = localStorage.getItem('IdUser');
    this.courseForm = this.fb.group({
      ClassroomName: ['', [Validators.required]],
      teacher: [{ idUser: IdUser }, [Validators.required]]
    });
  }

  onSubmit() {
    const classroomName = this.courseForm.get('ClassroomName')?.value;
    const teacherId = this.courseForm.get('teacher')?.value.idUser;

    if (!classroomName || !teacherId) {
      console.error('Classroom name and teacher ID are required.');
      return;
    }

    this.classroom.classroomName = classroomName;

    this.classroomService.addClassroom(this.classroom, teacherId)
      .subscribe({
        next: (response) => {
          console.log('Classroom added successfully:', response);
          // Reset values after adding
          this.courseForm.reset();
        },
        error: (error) => {
          console.error('Error adding classroom:', error);
        }
      });
  }
}