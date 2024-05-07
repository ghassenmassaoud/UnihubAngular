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
import { TaskService } from 'app/services/task.service';
import { Task } from 'app/models/Task';

export interface DialogData {
  id: number;
  // name: string;
  // department: string;
  // mobile: string;
}

@Component({
  selector: 'app-editTask:not(h)',
  templateUrl: './editTask.component.html',
  styleUrls: ['./editTask.component.scss'],
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
export class EditTaskDialogComponent {
  taskForm: FormGroup;
  fileToUpload: File | null = null;
  classroomId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { taskId:Task },
    public dialogRef: MatDialogRef<EditTaskDialogComponent>

  ) {
 ;
   this.taskForm = this.formBuilder.group({
    TaskDescription: [data.taskId.taskDescription ,Validators.required],
    Deadline: [data.taskId.deadline, Validators.required],
    ClassroomId: [null],
    file: [data.taskId.documents]
  });
}
   
updateTask(): void {
  if(this.taskForm.valid && this.data.taskId){
const taskId =this.data.taskId.idTask
const taskDescription =this.taskForm.value.TaskDescription
const deadline= this.taskForm.value.Deadline
const file =this.taskForm.value.fileToUpload
  this.taskService.updateTask(taskId, taskDescription, deadline, file).subscribe({
    next: (response: any) => {
      console.log('Task updated successfully:', response);
      this.dialogRef.close('success');    },
    error: (error) => {
      console.error('Error updating task:', error);
      // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
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
