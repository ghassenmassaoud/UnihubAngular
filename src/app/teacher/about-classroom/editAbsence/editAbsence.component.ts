import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

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
export class EditAbsenceDialogComponent {
  absenceForm!: FormGroup;
  enrolledStudents: User[] = [];
  absenceId: number;

  constructor(
    private formBuilder: FormBuilder,
    private abs: AbsenceService,
    @Inject(MAT_DIALOG_DATA) public data: { absenceId: number },
    public dialogRef: MatDialogRef<EditAbsenceDialogComponent>
  ) {
    this.absenceId = data.absenceId;
    this.abs.getAbsence(this.absenceId).subscribe({
      next: (absence: Absence) => {
        this.absenceForm = this.formBuilder.group({
          statusAbsence: [absence.statusAbsence, Validators.required],
          dateAbsence: [absence.dateAbsence, Validators.required],
          selectedStudent: [absence.studentId, Validators.required]
        });
      },
      error: (error) => {
        console.error('Error loading absence details:', error);
      }
    });
  }

  updateAbsence(): void {
    if (this.absenceForm.valid) {
      this.abs.updateAbsence(this.absenceForm.value, this.absenceId).subscribe({
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
