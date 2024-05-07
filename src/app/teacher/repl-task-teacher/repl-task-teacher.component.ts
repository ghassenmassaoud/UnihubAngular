import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCell, MatCellDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { ReplyTask } from 'app/models/ReplyTask';
import { Document } from 'app/models/Document';

import { LessonService } from 'app/services/lesson.service';
import { TaskService } from 'app/services/task.service';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-repl-task-teacher',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabGroup,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
   MatPaginator,
   FormsModule,
   MatTabsModule,
   MatTooltipModule,
   MatSortModule,
   NgClass,
   MatCheckboxModule,
   MatRippleModule,
   MatProgressSpinnerModule,
   MatMenuModule,
   MatPaginatorModule,
   DatePipe,
    RouterModule,
    BreadcrumbComponent,
    MatIconModule,
    MatFormFieldModule,
    MatCellDef,
    MatCell,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FeatherIconsComponent,
    FormsModule,
    MatTableModule,
    MatTab,

  ],
  templateUrl: './repl-task-teacher.component.html',
  styleUrl: './repl-task-teacher.component.scss'
})
export class ReplTaskTeacherComponent implements OnInit {
  breadscrums = [
    {
      title: 'All ReplyTask',
      items: ['Task'],
      active: 'All ReplyTask',
    },
  ];

  user!:[]
  enrolledTasks: ReplyTask[] = [];
  displayedColumns: string[] = ['student', 'taskState', 'documents', 'mark','action'];
  dataSource = new MatTableDataSource<ReplyTask>();
  selectedTaskId: number | null = null
  noTaskSelected = false 
  editMode?: boolean;
  editedRepTask: ReplyTask = {} as ReplyTask;
  taskId!:number

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private lessonService: LessonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['taskId'];
      if (taskId) {
        this.loadReplyTasks(taskId);
      } else {
        console.error('No Task ID provided.');
      }
    });
  }

  loadReplyTasks(taskId: number): void {
    this.taskService.getReplyTasksByTaskId(taskId).subscribe({
      next: (repTasks: ReplyTask[]) => {
        this.enrolledTasks = repTasks;
        this.dataSource.data = this.enrolledTasks;
      },
      error: (error) => {
        console.error('Error loading reply tasks:', error);
      }
    });
  }

  downloadDocument(selectedDocument: Document): void {
    this.lessonService.downloadLesson(selectedDocument.name).subscribe(response => {
      const contentDispositionHeader = response.headers.get('content-disposition');
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = fileNameRegex.exec(contentDispositionHeader || '');
      const suggestedFileName = matches && matches.length > 1 ? matches[1].replace(/['"]/g, '') : 'lesson';
      const blob = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });

      const link = window.document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = suggestedFileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    });
  }
  evaluateTask(): void {
    this.taskService.evaluateTask(this.editedRepTask.idTaskrep, this.editedRepTask.mark).subscribe({
      next: () => {
        console.log('Task evaluated successfully.');
        this.editMode = false;
        //this.loadReplyTasks(this.taskId);
      },
      error: (error) => {
        console.error('Error evaluating task:', error);
        // Afficher un message d'erreur à l'utilisateur
        alert('Error evaluating task. Please try again later.');
      }
    });
  }


  editMark(task: ReplyTask): void {
    this.editedRepTask = { ...task }; 
    this.editMode = true; 
  }

  cancelEdit(): void {
    this.editMode = false;
  }
  
  
}