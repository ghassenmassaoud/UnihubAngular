import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
//import { Teachers } from '../../teachers.model';
import { CommonModule, formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClassroomService } from 'app/services/classroom.service';
import { AbsenceService } from 'app/services/absence.service';
import { Observable } from 'rxjs';

export interface DialogData {
  id: number;
  action: string;
  //teachers: Teachers;
}

@Component({
  selector: 'app-form-dialog:not(h)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose,
  ],
})
export class FormDialogComponent implements OnInit {
  classroomForm: FormGroup;
  speciality:string[]=['ARCTIC','TWIN','SE','DS'];
  //action: string;
  //dialogTitle: string;
  // proForm: UntypedFormGroup;
  //classroomForm: FormGroup;
  students: any[] = [];
  students$!: Observable<any[]>;

  //teachers: Teachers;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private classroomService: ClassroomService,
    private absenceService : AbsenceService,
    private fb: FormBuilder
  ) {
    this.classroomForm = this.fb.group({
      idClassroom: ['', Validators.required], // Champs pour l'ID de la salle de classe
      speciality: ['', Validators.required], // Champs pour la spécialité
      student_id: ['', Validators.required] // Champs pour l'ID de l'étudiant
    });
    //this.proForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.classroomForm.get('speciality')?.valueChanges.subscribe((speciality: string) => {
      if (speciality) {
        this.students$ = this.absenceService.getStudentBySpeciality(speciality);
      } else {
        this.students$ = new Observable<any[]>(observer => observer.next([]));
      }
    });
  }
  // ngOnInit(): void {
  //   this.classroomForm = this.fb.group({
  //     idClassroom: ['', Validators.required], // Champs pour l'ID de la salle de classe
  //     speciality: ['', Validators.required], // Champs pour la spécialité
  //     student_id: ['', Validators.required] // Champs pour l'ID de l'étudiant
  //   });
  // }

    // Set the defaults
  //   this.action = data.action;
  //   if (this.action === 'edit') {
  //     this.dialogTitle = data.teachers.name;
  //     this.teachers = data.teachers;
  //   } else {
  //     this.dialogTitle = 'New Teachers';
  //     const blankObject = {} as Teachers;
  //     this.teachers = new Teachers(blankObject);
  //   }
    
  // }
  // formControl = new UntypedFormControl('', [
  //   Validators.required,
  //   // Validators.email,
  // ]);
  // getErrorMessage() {
  //   return this.formControl.hasError('required')
  //     ? 'Required field'
  //     : this.formControl.hasError('email')
  //       ? 'Not a valid email'
  //       : '';
  // }
  // createContactForm(): UntypedFormGroup {
  //   return this.fb.group({
  //     idClassroom: ['', Validators.required], // Champs pour l'ID de la salle de classe
  //     speciality: ['', Validators.required], // Champs pour la spécialité
  //     student_id: ['', Validators.required] 
      // email: [
      //   this.teachers.email,
      //   [Validators.required, Validators.email, Validators.minLength(5)],
      // ],
      // date: [
      //   formatDate(this.teachers.date, 'yyyy-MM-dd', 'en'),
      //   [Validators.required],
      // ],
      // gender: [this.teachers.gender],
      // mobile: [this.teachers.mobile],
      // department: [this.teachers.department],
      // degree: [this.teachers.degree],
  //   });
  // }
  onSubmit(): void {
    if (this.classroomForm.valid) {
      const classroomId = this.classroomForm.value.idClassroom;
      const studentId = this.classroomForm.value.student_id;
      // Appeler votre service pour affecter l'étudiant à la salle de classe
      this.classroomService.affectStudentToClassroom(studentId, classroomId).subscribe({
        next: (response) => {
          console.log('Student affected to classroom:', response);
          // Gérer la réponse si nécessaire
        },
        error: (error) => {
          console.error('Error affecting student to classroom:', error);
          // Gérer l'erreur si nécessaire
        }
      });
    } else {
      // Gérer le cas où le formulaire n'est pas valide
    }
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // public confirmAdd(): void {
   
  //     if (this.classroomForm.valid) {
  //       const classroomId = this.classroomForm.value.idClassroom;
  //       const studentId = this.classroomForm.value.student_id;
  //       // Appeler votre service pour affecter l'étudiant à la salle de classe
  //       this.classroomService.affectStudentToClassroom(studentId, classroomId).subscribe({
  //         next: (response) => {
  //           console.log('Student affected to classroom:', response);
  //           // Gérer la réponse si nécessaire
  //         },
  //         error: (error) => {
  //           console.error('Error affecting student to classroom:', error);
  //           // Gérer l'erreur si nécessaire
  //         }
  //       });
  //     } else {
  //       // Gérer le cas où le formulaire n'est pas valide
  //     }
  //   }
}
