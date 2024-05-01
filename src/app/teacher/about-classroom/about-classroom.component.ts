import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Classroom } from 'app/models/Classroom';
import { User } from 'app/models/User';
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

@Component({
  selector: 'app-about-classroom',
  standalone: true,
  imports: [ 
    CommonModule,
    BreadcrumbComponent,
    MatButtonModule,
    MatIconModule,
    MatTab,
    MatTabGroup,
    FeatherIconsComponent,
    MatTableModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
   MatPaginator,
   
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
  selectedClassroomId: number | null = null
  noClassroomSelected = false
  lessons: Lesson[] = []
 user!:[]
  dataSource!: MatTableDataSource<User>
  dataSource1!: MatTableDataSource<Lesson>
  dataSource2!:MatTableDataSource<Absence>
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
    private abs:AbsenceService

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const classroomId = params['classroomId'];
      if (classroomId) {
        this.selectedClassroomId = +classroomId; // Assurez-vous que l'identifiant est de type number
        this.loadEnrolledStudents();
        this.loadLessons();
        this.loadAbsence();
      } else {
        // Si aucun identifiant n'est présent dans l'URL, gérer le cas approprié
        this.noClassroomSelected = true;
        console.error('No classroom selected.');
      }
    });

  // this.dataSource2 = new MatTableDataSource(this.enrolledAbsence);
  // this.loadAbsence();
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
      data: {
        action: 'add',
       students: {}, // Passer un objet vide comme enseignant lors de l'ajout
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir la liste des enseignants après la fermeture du dialogue
      this. loadEnrolledStudents();
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
              this.dataSource1 = new MatTableDataSource<Lesson>(this.enrolledLessons); // Mettez à jour le dataSource
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
    data: {
      action: 'add',
     students: {}, // Passer un objet vide comme enseignant lors de l'ajout
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    // Rafraîchir la liste des enseignants après la fermeture du dialogue
    this. loadLessons();
  });
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


// loadAbsence(): void {
//   if (this.selectedClassroomId !== null) {
//     this.classroomService.getClassroom(this.selectedClassroomId).subscribe({
//       next: (classroom: any) => {
//         if (classroom && classroom.idClassroom) { // Vérifier si classroom et classroom.idClassroom sont définis
//           this.abs.getAbsenceByClassroom(classroom.idClassroom).subscribe({
//             next: (absences: Absence[]) => {
//               this.enrolledAbsence = absences.map(absence => ({
//                 ...absence,
//                 student: this.classroomService.getEnrolledStudents(classroom.idClassroom) // Utiliser classroom.idClassroom
//               }));
//               this.dataSource2.data = this.enrolledAbsence;
//             },
//             error: (error) => {
//               console.error('Error loading enrolled absences:', error);
//             }
//           });
//         } else {
//           console.error('Invalid classroom or classroom ID.');
//         }
//       },
//       error: (error) => {
//         console.error('Error loading classroom:', error);
//       }
//     });
//   } else {
//     this.noClassroomSelected = true;
//     console.error('No classroom selected.');
//   }
// }


// loadAbsence(): void {
//   if (this.selectedClassroomId !== null) {
//     this.classroomService.getClassroom(this.selectedClassroomId).subscribe({
//       next: (classroom: any) => {
//         this.abs.getAbsenceByClassroom(classroom.idClassroom).subscribe({
//           next: (absences:Absence[]) => {
//             this.enrolledAbsence = absences;
//             this.dataSource2.data = this.enrolledAbsence; // Mettre à jour les données du dataSource
//           },
//           error: (error) => {
//             console.error('Error loading enrolled absences:', error);
//           }
//         });
//       },
//       error: (error) => {
//         console.error('Error loading classroom:', error);
//       }
//     });
//   } else {
//     this.noClassroomSelected = true;
//     console.error('No classroom selected.');
//   }

// }
}