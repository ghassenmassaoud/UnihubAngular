import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCell, MatCellDef } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { Classroom } from 'app/models/Classroom';
import { ClassroomService } from 'app/services/classroom.service';

@Component({
  selector: 'app-list-classrrom-student',
  standalone: true,
    imports: [CommonModule,
                  RouterModule,
                  BreadcrumbComponent,
                  MatButtonModule,
                  MatIconModule,
                  MatFormFieldModule,
                  MatInputModule,
                  MatCellDef,
                  MatCell,
                  MatDialogTitle,
                  MatDialogContent,
                  MatDialogActions,
                  MatDialogClose,
                  FeatherIconsComponent,
                  FormsModule,
                ],
  
  templateUrl: './list-classrrom-student.component.html',
  styleUrl: './list-classrrom-student.component.scss'
})
export class ListClassrromStudentComponent implements OnInit {
    breadscrums = [
      {
        title: 'All Classroom',
        items: ['Classroom'],
        active: 'All Classroom',
      },
    ];
    classrooms: Classroom[] = []
    classroomId!: number;
    editedClassroom: Classroom = {} as Classroom;
    editMode: boolean = false;
    name: string = '';
   constructor(private router: Router,
    private route: ActivatedRoute,
     private classroomService: ClassroomService,
      public dialog: MatDialog,) { }

  ngOnInit(): void {

    this.classroomService.getClassroomsForStudent(1).subscribe(
      (data: Classroom[]) => {
        this.classrooms = data;
      },
      (error) => {
        console.error('Error fetching classrooms:', error);
      }
    );
  }
  openClassroom(classroomId: number) {

    // Rediriger vers la page de la salle de classe avec l'ID ajouté à l'URL
    this.router.navigate(['/student/aboutClassroom', classroomId]);
  }

}