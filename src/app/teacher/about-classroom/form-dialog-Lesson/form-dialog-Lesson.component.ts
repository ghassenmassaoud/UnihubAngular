import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonService } from 'app/services/lesson.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-form-dialog-Lesson:not(h)',
  templateUrl: './form-dialog-Lesson.component.html',
  styleUrls: ['./form-dialog-Lesson.component.scss'],
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
    MatNativeDateModule
  ],
})
export class FormDialogLessonComponent {
  lessonForm: FormGroup;
  fileToUpload: File | null = null;
  classroomId: number | null = null;
  visibility:string[]=['EVERYONE','ONLY_ME']
  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: { classroomId: number }
  ) {
   console.log(this.classroomId = data.classroomId);
    this.lessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
     visibility:['',Validators.required],
      file: [null],
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.lessonForm.valid && this.classroomId !== null) {
      const lessonName = this.lessonForm.value.lessonName;
      const visibility=this.lessonForm.value.visibility;
      //console.log(visibility);
      console.log(this.fileToUpload);
      console.log(this.classroomId);
      // if (lessonName) {
        this.lessonService.addLesson(lessonName, visibility,this.classroomId, this.fileToUpload!).subscribe({
          next: (response: any) => {
            console.log('Lesson added successfully:', response);
            // Réinitialiser le formulaire ou rediriger vers une autre page, etc.
          },
          error: (error) => {
            console.error('Error adding lesson:', error);
            // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
          }
        });
      }
    }
  }

