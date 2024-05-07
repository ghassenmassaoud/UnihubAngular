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
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-form-dialog-Task:not(h)',
  templateUrl: './form-dialog-Task.component.html',
  styleUrls: ['./form-dialog-Task.component.scss'],
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
export class FormDialogTaskComponent {
  taskForm: FormGroup;
  fileToUpload: File | null = null;
  classroomId: number | null = null;
  //visibility:string[]=['EVERYONE','ONLY ME']
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { classroomId: number }
  ) {
   console.log(this.classroomId = data.classroomId);
   this.taskForm = this.formBuilder.group({
    TaskDescription: ['', Validators.required],
    Deadline: [null, Validators.required],
    ClassroomId: [null],
    file: [null]
  });
}

onFileChange(event: any) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    this.fileToUpload = fileInput.files[0];
  }
}

onSubmit() {
  if (this.taskForm.valid&& this.classroomId !== null)  {
    const taskDescription = this.taskForm.value.TaskDescription;
    const deadline = this.taskForm.value.Deadline;
    const classroomId = this.taskForm.value.ClassroomId;
    
    this.taskService.addTask(taskDescription, deadline, this.classroomId, this.fileToUpload!).subscribe({
      next: (response: any) => {
        console.log('Task added successfully:', response);
        // Réinitialiser le formulaire ou rediriger vers une autre page, etc.
      },
      error: (error) => {
        console.error('Error adding task:', error);
        // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
      }
    });
  }
}
  }

