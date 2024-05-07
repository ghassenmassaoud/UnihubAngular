import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Classroom } from 'app/models/Classroom';
import { User } from '../../Pi-User/Models/User';
import { ClassroomService } from 'app/services/classroom.service';
import { Observable, catchError, tap } from 'rxjs';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { LessonService } from 'app/services/lesson.service';
import { TaskService } from 'app/services/task.service';
import { AbsenceService } from 'app/services/absence.service';
import { Lesson } from 'app/models/Lesson';
import { Document } from 'app/models/Document';
import { FormDialogLessonComponent } from './form-dialog-Lesson/form-dialog-Lesson.component';
import { Absence } from 'app/models/Absence';
import { FormDialogAbsenceComponent } from './form-dialog-Absence/form-dialog-Absence.component';
import { Task } from 'app/models/Task';
import { FormDialogTaskComponent } from './form-dialog-task/form-dialog-Task.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EditLessonDialogComponent } from './editLesson/editLesson.component';
import { EditTaskDialogComponent } from './editTask/editTask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAbsenceDialogComponent } from './editAbsence/editAbsence.component';

@Component({
  selector: 'app-about-classroom',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTab,
    MatTabGroup,
    FeatherIconsComponent,
    MatTableModule,
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
  ],
  templateUrl: './about-classroom.component.html',
  styleUrl: './about-classroom.component.scss'
})
export class AboutClassroomComponent  implements OnInit {
  breadscrums = [
    {
      title: 'About Classroom',
      items: ['Classroom'],
      active: 'About Classroom',
    },
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  enrolledStudents: User[] = []
  enrolledLessons: Lesson[]=[]
  enrolledAbsence: Absence[]=[]
  enrolledTasks: Task[]=[]
  selectedClassroomId: number | null = null
  selectedStudentId: number | null = null
  selectedLessonId: number | null = null
  noClassroomSelected = false
  lessons: Lesson[] = []
  searchDate: string = '';
  statusFilter:string = '';
 user!:[]
  dataSource!: MatTableDataSource<User>
  dataSource1!: MatTableDataSource<Lesson>
  dataSource2!:MatTableDataSource<Absence>
  dataSource4!:MatTableDataSource<Task>
  dataSourceStudents!: MatTableDataSource<User>;
  dataSourceLessons!: MatTableDataSource<Lesson>;
  dataSourceAbsence!: MatTableDataSource<Absence>;

  displayedColumnsStudents: string[] = ['firstName', 'lastName', 'email'];
  displayedColumnsLessons: string[] = ['lessonName', 'documents'];
  displayedColumnsAbsence: string[] = ['studentName', 'dateAbsence', 'statusAbsence'];

  constructor(private classroomService: ClassroomService,
    private route: ActivatedRoute ,
    public dialog: MatDialog,
    private  lesson:LessonService,
    private task:TaskService,
    private abs:AbsenceService,
    private snackBar: MatSnackBar,
    private router: Router,

  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const classroomId = params['classroomId'];
      if (classroomId) {
        this.selectedClassroomId = +classroomId; // Assurez-vous que l'identifiant est de type number
        this.loadEnrolledStudents();
        this.loadLessons();
        this.loadAbsence();
        this.loadTask();
      } else {
        // Si aucun identifiant n'est présent dans l'URL, gérer le cas approprié
        this.noClassroomSelected = true;
        console.error('No classroom selected.');
      }
    });

    this.dataSource = new MatTableDataSource<User>(this.enrolledStudents);
    this.loadEnrolledStudents();
  }
  ///StudenList Partt

  loadEnrolledStudents(): void {
    if (this.selectedClassroomId !== null) {
      this.classroomService.getClassroom(this.selectedClassroomId).subscribe({
        next: (classroom: any) => {
          this.classroomService.getEnrolledStudents(classroom.idClassroom).subscribe({
            next: (students: User[]) => {
              this.enrolledStudents = students;
              this.dataSource.data = this.enrolledStudents; // Mettre à jour les données du dataSource
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
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { classroomId: this.selectedClassroomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this. loadEnrolledStudents();
    });
  }
  deleteStudent(studentId: number) {
    if (this.selectedClassroomId !== null) {
      this.classroomService.removeStudentFromClassroom(this.selectedClassroomId, studentId).subscribe({
        next: (response) => {
          console.log('Student deleted:', response);
          const index = this.enrolledStudents.findIndex((student) => student.idUser === studentId);
          if (index !== -1) {
            this.enrolledStudents.splice(index, 1);
            this.showNotification('Student deleted successfully.');
          }
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          if (error.status === 404) {
            console.error('Student not found or invalid URL:', error.error);
          } else {
            console.error('Other error:', error.error);
          }
        }
      });
    }
  }

  showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'snackbar-success',
    });
  }



  //////Lesson Parttt
  loadLessons(): void {
    if (this.selectedClassroomId !== null) {
      this.classroomService.getClassroom(this.selectedClassroomId).subscribe({
        next: (classroom: any) => {
          this.lesson.getLessonsByClassroom(classroom.idClassroom).subscribe({
            next: (lessons: Lesson[]) => {
              this.enrolledLessons = lessons;
              this.dataSource1 = new MatTableDataSource<Lesson>(this.enrolledLessons);
            },
            error: (error) => {
              console.error('Error loading enrolled lesson:', error);
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
downloadDocument(selectedDocument: Document): void {
  this.lesson.downloadLesson(selectedDocument.name).subscribe(response => {
    const contentDispositionHeader = response.headers.get('content-disposition');
    const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = fileNameRegex.exec(contentDispositionHeader || '');
    const suggestedFileName = matches && matches.length > 1 ? matches[1].replace(/['"]/g, '') : 'lesson';
    const blob = new Blob([response.body as BlobPart], { type: 'application/octet-stream' });

    // Créer un lien temporaire pour télécharger le fichier
    const link = window.document.createElement('a'); // Utilisez window.document.createElement
    link.href = window.URL.createObjectURL(blob);
    link.download = suggestedFileName;
    window.document.body.appendChild(link); // Utilisez window.document.body
    link.click();

    // Nettoyer après le téléchargement
    window.document.body.removeChild(link); // Utilisez window.document.body
  });
}
addNewLess(): void {
  const dialogRef = this.dialog.open(FormDialogLessonComponent, {
    data: { classroomId: this.selectedClassroomId }
  })

  dialogRef.afterClosed().subscribe(result => {
    // Rafraîchir la liste des enseignants après la fermeture du dialogue
    this. loadLessons();
  });
}


// Définissez une fonction pour ouvrir le dialogue d'édition de leçon
editLesson(lessonId: number): void {
  // Chargez les détails de la leçon à partir de son ID
  this.lesson.getLesson(lessonId).subscribe({
    next: (lesson: Lesson) => {
      const dialogRef = this.dialog.open(EditLessonDialogComponent, {
        data: { lesson: lesson }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loadLessons(); // Rechargez les leçons après l'édition réussie
        }
      });
    },
    error: (error) => {
      console.error('Error loading lesson details:', error);
    }
  });
}


// Définissez une fonction pour supprimer une leçon
deleteLesson(lessonId: number): void {
  if (confirm('Do you really want to Delete this Lesson ?')) {
    this.lesson.deleteLesson(lessonId).subscribe({
      next: () => {
        this.loadLessons(); // Rechargez les leçons après la suppression réussie
        console.log('Lesson deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting lesson:', error);
      }
    });
  }
}


///////////////////////Absenceeee///////////////////////////
loadAbsence(): void {
  if (this.selectedClassroomId !== null) {
    this.abs.getAbsenceByClassroom(this.selectedClassroomId).subscribe({
      next: (absences) => {
        this.enrolledAbsence = absences[0].absences;
       console.log(this.user=absences);
        this.dataSourceAbsence = new MatTableDataSource<Absence>(this.enrolledAbsence);
      },
      error: (error) => {
        console.error('Error loading enrolled absences:', error);
      }
    });
  } else {
    this.noClassroomSelected = true;
    console.error('No classroom selected.');
  }
}
addNewAbsence(): void {
  if (this.selectedClassroomId !== null) {
    const dialogRef = this.dialog.open(FormDialogAbsenceComponent, {
      data: { classroomId: this.selectedClassroomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadAbsence(); // Rechargez les absences après l'ajout réussi
      }
    });
  } else {
    console.error('No classroom selected.');
  }
}
editAbsence(absenceId: number): void {
  // Chargez les détails de la leçon à partir de son ID
  this.abs.getAbsence(absenceId).subscribe({
    next: (absence: Absence) => {
      const dialogRef = this.dialog.open(EditAbsenceDialogComponent, {
        data: { absenceId:  absence.idAbsence } // Utilisez taskId au lieu de task
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loadLessons(); // Rechargez les leçons après l'édition réussie
        }
      });
    },
    error: (error) => {
      console.error('Error loading absence details:', error);
    }
  });
}

deleteAbcence(absenceId: number): void {
  if (confirm('Do you really want to Delete this Absence ? ')) {
    this.abs.deleteAbsence(absenceId).subscribe({
      next: () => {
        this.loadAbsence(); // Rechargez les leçons après la suppression réussie
        console.log('Absence deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting Absence:', error);
      }
    });
  }
}
searchAbsence(status: string): void {
  this.abs.searchByStatus(status).subscribe({
    next: (absence: Absence[]) => {
      console.log('Absence with Status found:', absence);
      this.enrolledAbsence = absence;

    },
    error: (error) => {
      console.error('Error searching Absence by Status', error);
    }
  });
}
searchAbsenceDate(date: string): void {
  this.abs.searchByDate(date).subscribe({
    next: (absence: Absence[]) => {
      console.log('Absnece found:', absence);
      this.enrolledAbsence = absence;
    },
    error: (error) => {
      console.error('Error searching absences by date:', error);
    }
  });
}


///////////////////////Task////////////////////////
loadTask(): void {
    if (this.selectedClassroomId !== null) {
      this.classroomService.getClassroom(this.selectedClassroomId).subscribe({
        next: (classroom: any) => {
          this.task.getTasksByClassroom(classroom.idClassroom).subscribe({
            next: (tasks: Task[]) => {
              this.enrolledTasks = tasks;
              this.dataSource4 = new MatTableDataSource<Task>(this.enrolledTasks); // Mettez à jour le dataSource
            },
            error: (error) => {
              console.error('Error loading enrolled lesson:', error);
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
addNewTask(): void {
  if (this.selectedClassroomId !== null) {
    const dialogRef = this.dialog.open(FormDialogTaskComponent, {
      data: { classroomId: this.selectedClassroomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadTask();
      }
    });
  } else {
    console.error('No classroom selected.');
  }
}

// Définissez une fonction pour ouvrir le dialogue d'édition de leçon
editTask(taskId: number): void {
  // Chargez les détails de la leçon à partir de son ID
  this.task.getTask(taskId).subscribe({
    next: (task: Task) => {
      const dialogRef = this.dialog.open(EditTaskDialogComponent, {
        data: { taskId: task } // Utilisez taskId au lieu de task
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loadLessons(); // Rechargez les leçons après l'édition réussie
        }
      });
    },
    error: (error) => {
      console.error('Error loading task details:', error);
    }
  });
}

deleteTask(taskId: number): void {
  if (confirm('Do you really want to Delete this Task ? ')) {
    this.task.removeTask(taskId).subscribe({
      next: () => {
        this.loadLessons(); // Rechargez les leçons après la suppression réussie
        console.log('Task deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting lesson:', error);
      }
    });
  }
}
searchTasks(date: string): void {
  this.task.searchTaskByDate(date).subscribe({
    next: (tasks: Task[]) => {
      console.log('Tasks found:', tasks);
      this.enrolledTasks = tasks;
    },
    error: (error) => {
      console.error('Error searching tasks by date:', error);
    }
  });
}

openTask(taskId: number): void {
  if (taskId) {
    this.router.navigate(['/teacher/replyTask', taskId]);
  } else {
    console.error('Task ID is undefined.');
  }
}

}