import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { LessonService } from 'app/services/lesson.service';
import { AbsenceService } from 'app/services/absence.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lesson } from 'app/models/Lesson';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Absence } from 'app/models/Absence';
import { User } from 'app/models/User';
import { MatTableDataSource } from '@angular/material/table';
import { ClassroomService } from 'app/services/classroom.service';

export interface DialogData {
  id: number;
  // name: string;
  // department: string;
  // mobile: string;
}

@Component({
  selector: 'app-editAbsence:not(h)',
  templateUrl: './editAbsence.component.html',
  styleUrls: ['./editAbsence.component.scss'],
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
  
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    ReactiveFormsModule,
  ],
})
export class EditAbsenceDialogComponent  implements OnInit {
  absenceForm!: FormGroup;
  enrolledStudents: User[] = [];
  //absenceId: number;
  classroomId: number | null = null; 
  noClassroomSelected = false;
  dataSource = new MatTableDataSource<User>([]);
  constructor(
    private formBuilder: FormBuilder,
    private abs: AbsenceService,
    @Inject(MAT_DIALOG_DATA) public data: { absenceId: Absence },
    public dialogRef: MatDialogRef<EditAbsenceDialogComponent>,
    private classroomService: ClassroomService
  ) {
    //this.absenceId = data.absenceId;
    this.absenceForm = this.formBuilder.group({
      statusAbsence: [data.absenceId.statusAbsence, Validators.required],
      dateAbsence: [data.absenceId.dateAbsence, Validators.required],
      selectedStudent: [data.absenceId.studentId?.firstName, Validators.required]
    });
     
  }
  ngOnInit() {
    this.loadEnrolledStudents();
  }

  loadEnrolledStudents(): void {
    if (this.classroomId !== null) {
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
  updateAbsence(): void {
    if (this.absenceForm.valid && this.data.absenceId ) {
      const formValue = this.absenceForm.value;
      const absenceId =this.data.absenceId.idAbsence
       formValue.selectedStudent; 
      formValue.statusAbsence = formValue.statusAbsence.toUpperCase();
      formValue.dateAbsence =formValue.dateAbsence

      this.abs.updateAbsence(formValue, absenceId).subscribe({
        next: (response) => {
          console.log('Absence updated successfully:', response);
          this.dialogRef.close('success'); // Fermer le dialogue avec un indicateur de succès
        },
        error: (error) => {
          console.error('Error updating absence:', error);
        }
      })
  }
}


}
