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

  enrolledStudents: User[] = [];
  selectedClassroomId: number | null = null;
  noClassroomSelected = false; // Ajoutez cette variable pour gérer le cas où aucune salle de classe n'est sélectionnée

  dataSource!: MatTableDataSource<User>;

  constructor(private classroomService: ClassroomService,  private route: ActivatedRoute ,  public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const classroomId = params['classroomId'];
      if (classroomId) {
        this.selectedClassroomId = +classroomId; // Assurez-vous que l'identifiant est de type number
        this.loadEnrolledStudents();
      } else {
        // Si aucun identifiant n'est présent dans l'URL, gérer le cas approprié
        this.noClassroomSelected = true;
        console.error('No classroom selected.');
      }
    });
  
    this.dataSource = new MatTableDataSource<User>(this.enrolledStudents);
    this.loadEnrolledStudents();
  }

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
  // affectStudentToClassroom(studentId: number, classroomId: number): void {
  //   this.classroomService.affectStudentToClassroom(studentId, classroomId)
  //     .pipe(
  //       tap(response => {
  //         console.log('Student affected to classroom:', response);
  //         // Rafraîchissez la liste des étudiants si nécessaire
  //       }),
  //       catchError(error => {
  //         console.error('Error affecting student to classroom:', error);
  //         // Gérez les erreurs si nécessaire
  //         throw error;
  //       })
  //     )
  //     .subscribe();
  // }
}