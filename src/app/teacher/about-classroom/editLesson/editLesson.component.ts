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

export interface DialogData {
  id: number;
  // name: string;
  // department: string;
  // mobile: string;
}

@Component({
  selector: 'app-editLesson:not(h)',
  templateUrl: './editLesson.component.html',
  styleUrls: ['./editLesson.component.scss'],
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
export class EditLessonDialogComponent {
  lessonForm: FormGroup;
  fileToUpload: File | null = null;
  visibility: string[] = ['EVRYONE', 'ONLY_ME'];

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: { lesson: Lesson },
    public dialogRef: MatDialogRef<EditLessonDialogComponent>
  ) {
    this.lessonForm = this.formBuilder.group({
      lessonName: [data.lesson.lessonName, Validators.required],
      visibility: [data.lesson.visibility, Validators.required],
      file: [data.lesson.documents, Validators.required],
    });
  }

  updateLesson(): void {
    if (this.lessonForm.valid && this.data.lesson) {
      const lessonId = this.data.lesson.idLesson;
      const lessonName = this.lessonForm.value.lessonName;
      const visibility = this.lessonForm.value.visibility;
      const file = this.fileToUpload;

      this.lessonService.updateLesson( lessonName, visibility,lessonId, file).subscribe({
        next: (response: any) => {
          console.log('Lesson updated successfully:', response);
          this.dialogRef.close('success'); // Ferme la boîte de dialogue après la mise à jour réussie
        },
        error: (error) => {
          console.error('Error updating lesson:', error);
          // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
          
        }
      });
    }
  }
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }
}
