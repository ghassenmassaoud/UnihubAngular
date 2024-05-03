import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { LessonService } from 'app/services/lesson.service';
import { AbsenceService } from 'app/services/absence.service';

export interface DialogData {
  id: number;
  // name: string;
  // department: string;
  // mobile: string;
}

@Component({
  selector: 'app-delete:not(h)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private lessonService: LessonService,
    private abs:AbsenceService
  
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDeleteLesson(): void {
    this.lessonService.deleteLesson(this.data.id);
  }
  confirmeDeleteAbsence():void{
    this.abs.deleteAbsence(this.data.id);
  }
}
