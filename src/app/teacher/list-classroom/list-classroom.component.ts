import { Direction } from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Classroom } from 'app/models/Classroom';
import { ClassroomService } from 'app/services/classroom.service';
import { Observable } from 'rxjs';
import { FormDialogComponent } from '../lectures/dialogs/form-dialog/form-dialog.component';
import { MatCell, MatCellDef } from '@angular/material/table';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { User } from 'app/models/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-list-classroom',
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
            RouterModule,
            MatDialogTitle,
            MatDialogContent,
            MatDialogActions,
            MatDialogClose,
            FeatherIconsComponent,
            FormsModule,],

  templateUrl: './list-classroom.component.html',
  styleUrl: './list-classroom.component.scss'
})
export class ListClassroomComponent implements OnInit {
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

  constructor(private router: Router,private route: ActivatedRoute, private classroomService: ClassroomService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    //this.classroomId = +this.route.snapshot.paramMap.get('id');

    this.getAllClassrooms();
  }

  getAllClassrooms() {
    this.classroomService.getAllClassrooms()
      .subscribe((data: any[]) => { console.log(this.classrooms = data) });


  }
  searchClassroom() {
    this.classroomService.searchClassroomByNameOrTeacherName(this.name).subscribe({
      next:(response: any) => {
        this.classrooms = response;
      },
      error:(error) => {
        console.log(error);
      }
  });
  }
  
  openClassroom(classroomId: number) {

    // Rediriger vers la page de la salle de classe avec l'ID ajouté à l'URL
    this.router.navigate(['/teacher/aboutClassroom', classroomId]);
  }

  //delete Classroom
  deleteClassroom(classroomId: number): void {
    this.classroomService.removeClassroom(classroomId).subscribe({
        next: (response: any) => {
            if (response && response.status === 'success') {
                console.log('Classroom deleted successfully');
            } else {
                console.error('Error deleting classroom:', response);
            }
            this.getAllClassrooms();
        },
        error: (error) => {
            console.error('Error deleting classroom:', error);
        
        }
    });
}
//EditClassroom
editClassroom(classroom: Classroom): void {
  // Copier les données de la salle de classe sélectionnée pour l'édition
  this.editedClassroom = { ...classroom };
  this.editMode = true;
  
}

updateClassroom(): void {
  this.classroomService.updateClassroom(this.editedClassroom.idClassroom, this.editedClassroom)
      .subscribe({
          next: () => {
              console.log('Classroom updated successfully');
              this.editMode = false;
              this.getAllClassrooms(); 
          },
          error: (error) => {
              console.error('Error updating classroom:', error);
          }
      });
}

cancelEdit(): void {
  this.editMode = false;
}


}

