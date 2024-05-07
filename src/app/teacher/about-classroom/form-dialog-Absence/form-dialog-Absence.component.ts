import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomService } from 'app/services/classroom.service';
import { LessonService } from 'app/services/lesson.service';
import { Lesson } from 'app/models/Lesson';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { User } from 'app/models/User';
import { AbsenceService } from 'app/services/absence.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-form-dialog-Absence:not(h)',
  templateUrl: './form-dialog-Absence.component.html',
  styleUrls: ['./form-dialog-Absence.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //ActivatedRouteSnapshot,
  ],
})
export class FormDialogAbsenceComponent implements OnInit {
  absenceForm!: FormGroup;
  enrolledStudents: User[] = [];
  //selectedClassroomId: number | null = null;
  noClassroomSelected = false;
  dataSource = new MatTableDataSource<User>([]);
  classroomId: number | null = null; 
  constructor(
    private dialogRef: MatDialogRef<FormDialogAbsenceComponent>,
    private formBuilder: FormBuilder,
    private abs: AbsenceService,
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { classroomId: number } // Recevoir l'ID de la salle de classe
) {
  this.classroomId = data.classroomId;
  this.absenceForm = this.formBuilder.group({
    statusAbsence: ['', Validators.required],
    dateAbsence: [null, Validators.required],
    selectedStudent: ['', Validators.required]
  });
}

ngOnInit(): void {
  if (this.classroomId !== null) {
    console.log(this.classroomId);
    console.log(this.loadEnrolledStudents());
   } 
}
loadEnrolledStudents(): void {
  if (this.classroomId !== null) {
    console.log(this.classroomId);
    this.classroomService.getClassroom(this.classroomId).subscribe({
      next: (classroom: any) => {
        this.classroomService.getEnrolledStudents(classroom.idClassroom).subscribe({
          next: (students: User[]) => {
            this.enrolledStudents = students;
            this.dataSource.data = this.enrolledStudents;
          },
          error: (error) => {
            console.error('Error loading enrolled students:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading classroom:', error);
      }
    });
  } else {
    this.noClassroomSelected = true;
    console.error('No classroom selected.');
  }
}
onSubmit(): void {
  if (this.absenceForm.valid && this.classroomId !== null) {
    const formValue = this.absenceForm.value;
    formValue.statusAbsence = formValue.statusAbsence.toUpperCase();
    const selectedStudentId = formValue.selectedStudent; 
    // Extract the selected student's ID
    this.abs.addAbsence(this.classroomId, selectedStudentId, formValue).subscribe({
      next: (response: any) => {
        console.log('Absence added successfully:', response);
        this.dialogRef.close('success');
      },
      error: (error) => {
        console.error('Error adding absence:', error);
      }
    });
  } else {
    console.error('Classroom ID is null or form is invalid.');
  }
}
}

