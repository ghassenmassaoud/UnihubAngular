import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomService } from 'app/services/classroom.service';
import { LessonService } from 'app/services/lesson.service';
import { Lesson } from 'app/models/Lesson';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-dialog-Lesson:not(h)',
  templateUrl: './form-dialog-Lesson.component.html',
  styleUrls: ['./form-dialog-Lesson.component.scss'],
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
export class FormDialogLessonComponent {
  lessonForm: FormGroup;
  fileToUpload: File| null  = null;

  constructor(private formBuilder: FormBuilder, private lessonService: LessonService) {
    this.lessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      classroom: [''], // Classroom n'est pas requis
      file: [null] // File n'est pas requis
    });
  }

  onFileChange(event:any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }

  onSubmit() {
    const lessonName = this.lessonForm.value.lessonName;
    const classroom = this.lessonForm.value.classroom;
    if (lessonName) {
      this.lessonService.addLesson(lessonName, classroom, this.fileToUpload!).subscribe(
        (response) => {
          console.log('Lesson added successfully:', response);
          // Réinitialiser le formulaire ou rediriger vers une autre page, etc.
        },
        (error) => {
          console.error('Error adding lesson:', error);
          // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
        }
      );
    }
  }
}
// export class FormDialogLessonComponent {
//   lessonForm!: FormGroup;
//   file: File | null = null;
//   visibility: string[] = ['EveryOne', 'Only Me'];

//   constructor(
//     public dialogRef: MatDialogRef<FormDialogLessonComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private classroomService: ClassroomService,
//     private lessonService: LessonService,
//     private fb: FormBuilder
//   ) {
//     this.file=null;
//   }

//   ngOnInit(): void {
//     this.lessonForm = this.fb.group({
//       lessonName: ['', Validators.required],
//       visibility: ['', Validators.required],
//       idClassroom: ['', Validators.required],
//       file: [null, Validators.required]
//     });
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onFileChange(event: any): void {
//     const files = event.target.files;
//     if (files.length > 0) {
//       this.file = files[0];
//     }
//   }
//   addLesson(): void {
//     if (this.lessonForm.valid && this.file) {
//       const lessonData = this.lessonForm.value;
//       const classroomId = lessonData.idClassroom;
  
//       const formData = new FormData();
//       formData.append('lesson', lessonData.lessonName);
//       formData.append('lesson', lessonData.visibility);
//       formData.append('idClssroom', classroomId.toString());
//       formData.append('file', this.file, this.file.name);
  
//       // Vérifier le contenu exact de formData
//       console.log(formData);
  
//       this.lessonService.addLesson(formData).subscribe(
//         (response: any) => {
//           console.log('Lesson added successfully:', response);
//           this.dialogRef.close();
//         },
//         (error: any) => {
//           console.error('Error adding lesson:', error);
//         }
//       );
//     } else {
//       console.error('Form is invalid or file is missing.');
//     }
//   }
  
  
//   // addLesson(): void {
//   //   if (this.lessonForm.valid && this.file) {
//   //     const lessonData = this.lessonForm.value;
//   //     const classroomId = lessonData.idClassroom;
      
//   //     // Créer un objet FormData
//   //     const formData = new FormData();
//   //     // Ajouter les données de la leçon
//   //     formData.append('lesson', lessonData);
//   //     // formData.append('visibility', lessonData.visibility);
//   //     formData.append('idClassroom', classroomId.toString());
//   //     // Ajouter le fichier
//   //     formData.append('file', this.file, this.file.name);
  
//   //     console.log('FormData:', formData); // Vérifier que les données sont correctes dans la console
  
//   //     // Appeler le service pour ajouter la leçon
//   //     this.lessonService.addLesson(formData).subscribe(
//   //       (response: any) => {
//   //         console.log('Lesson added successfully:', response);
//   //         this.dialogRef.close();
//   //       },
//   //       (error: any) => {
//   //         console.error('Error adding lesson:', error);
//   //       }
//   //     );
//   //   } else {
//   //     console.error('Form is invalid or file is missing.');
//   //   }
//   // }
  
//   // addLesson(): void {
//   //   if (this.lessonForm.valid && this.file) {
//   //     const lessonData = this.lessonForm.value;
//   //     console.log('add lesson ', lessonData);
//   //     const classroomId = lessonData.idClassroom;
//   //     this.lessonService.addLesson(lessonData, classroomId, this.file).subscribe(
//   //       response => {
//   //         console.log('Lesson added successfully:', response);
//   //         this.dialogRef.close();
//   //       },
//   //       error => {
//   //         console.error('Error adding lesson:', error);
//   //       }
//   //     );
//   //   } else {
//   //     console.error('Form is invalid or file is missing.');
//   //   }
//   // }
// }
  

// export class FormDialogLessonComponent implements OnInit {
//   lessonForm!: FormGroup;
//   file: File | null = null;
//   visibility: string[] = ['EveryOne', 'Only Me'];

//   constructor(
//     public dialogRef: MatDialogRef<FormDialogLessonComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private classroomService: ClassroomService,
//     private lessonService: LessonService,
//     private fb: FormBuilder
//   ) {
//     // this.lessonForm = this.fb.group({
//     //   lessonName: ['', Validators.required],
//     //   visibility: ['', Validators.required],
//     //   idClassroom: ['', Validators.required],
//     //   file: ['']
//     // });
//   }
  
//   ngOnInit(): void {
//     this.lessonForm = this.fb.group({
//       lessonName: ['', Validators.required],
//       visibility: [''],
//       idClassroom: ['', Validators.required],
//       file: ['']
//     });
//   }

//   //ngOnInit(): void {}
//   // onSubmit(): void {
//   //   if (this.file) {
//   //     if (this.lessonForm.valid) {
//   //       const lesson: Lesson = this.lessonForm.value;
//   //       const classroomId = this.lessonForm.value.idClassroom as number;
  
//   //       this.classroomService.getClassroom(classroomId).subscribe({
//   //         next: (defaultClassroom) => {
//   //           if (defaultClassroom) {
//   //             this.lessonForm.patchValue({
//   //               idClassroom: defaultClassroom.idClassroom
//   //             });
  
//   //            this.lessonService.addLesson(lesson,defaultClassroom, this.file!).subscribe({
//   //               next: (response) => {
//   //                 console.log('Lesson added successfully:', response);
//   //                 // Afficher un message de succès à l'utilisateur si nécessaire
//   //                 this.dialogRef.close();
//   //               },
//   //               error: (error) => {
//   //                 console.error('Error adding the lesson: ', error);
//   //                 // Afficher un message d'erreur à l'utilisateur si nécessaire
//   //               }
//   //             });
//   //           } else {
//   //             console.error('Default classroom not found');
//   //             // Afficher un message d'erreur à l'utilisateur si nécessaire
//   //           }
//   //         },
//   //         error: (error) => {
//   //           console.error('Error retrieving default classroom: ', error);
//   //           // Afficher un message d'erreur à l'utilisateur si nécessaire
//   //         }
//   //       });
//   //     } else {
//   //       console.error('Form is invalid');
//   //       // Afficher un message d'erreur à l'utilisateur si nécessaire
//   //     }
//   //   } else {
//   //     console.error('No file selected');
//   //     // Afficher un message d'erreur à l'u
//   //   }
//   // }  

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   onFileChange(event: any): void {
//     const files = event.target.files;
//     if (files.length > 0) {
//       this.file = files[0];
//       console.log('File selected:', this.file);
//     }
//   }


// // addLesson():void{
// //     if (!this.file) {
// //     console.error('No file selected');
// //     return;
// //   }
// //     console.log('LessonName:', this.lessonForm.value);
// //     console.log('file:', this.file);
// //     const lesson: Lesson = this.lessonForm.value;
// //  const Idclassroom = this.lessonForm.value.idClassroom;
// //    this.lessonService.addLesson(lesson,Idclassroom, this.file).subscribe(
// //     data => {
// //       console.log('Response:', data);
// //     },
// //     err => {
// //       console.error('Error:', err);
// //     }
// //   );
// // }
// addLesson(): void {
//   if (!this.lessonForm.valid) {
//     console.error('Form is not valid.');
//     return;
//   }

//   const lessonData = this.lessonForm.value;
//   const classroomId = lessonData.idClassroom;
//   console.log('Lesson:', lessonData);
// console.log('file:', this.file)
//   if (this.file) {
//     this.lessonService.addLesson(classroomId, lessonData, this.file).subscribe(
//       response => {
//         console.log('Lesson added successfully', response);
//         this.dialogRef.close();
//       },
//       error => {
//         console.error('Error adding lesson:', error);
//       }
//     );
//   } else {
//     console.error('No file selected.');
//   }
// }

// // onFileChange(event: Event): void {
// //   const inputElement = event.target as HTMLInputElement;
// //   if (inputElement.files && inputElement.files.length > 0) {
// //     const file = inputElement.files[0];
// //     this.lessonForm.get('file').setValue(file);
// //   }
// // }



// }
  // onSubmit(): void {
//   //   if (this.lessonForm.valid) {
//   //     const classroomId = this.lessonForm.value.idClassroom;
//   //     const lesson: Lesson = this.lessonForm.value;
//   //     const file: File | null = this.lessonForm.value.documents; // Assurez-vous que file est de type File ou null
  
//   //     if (file) {
//   //       this.lesson.addLesson(lesson, classroomId, file).subscribe({
//   //         next: (response) => {
//   //           console.log('lesson added successfully:', response);
//   //           // Gérer la réponse si nécessaire
//   //         },
//   //         error: (error) => {
//   //           console.error('Error adding the lesson: ', error);
//   //           // Gérer l'erreur si nécessaire
//   //         }
//   //       });
//   //     } else {
//   //       console.error('File is null');
//   //     }
//   //   } else {
//   //     console.error('Form is invalid');
//   //   }
//   // }

// addSportTeamCap(): void {
//   if (!this.selectedFile) {
//     console.error('No file selected');
//     return;
//   }

//   console.log('Team Name:', this.teamName);
//   console.log('Selected File:', this.selectedFile);

//   const captainId = 10;
//   this.sportTeamService.addSportTeam(this.teamName, captainId, this.selectedFile).subscribe(
//     data => {
//       console.log('Response:', data);
//     },
//     err => {
//       console.error('Error:', err);
//     }
//   );
// }

// onFileChange(event: any): void {
//   this.selectedFile = event.target.files[0];
//   console.log('File selected:', this.selectedFile);
// }

// addUserToTeam(sportTeamId: number, userId: number): void {
//   this.sportTeamService.addUserToSportTeam(sportTeamId, userId).subscribe(
//     data => {
//       console.log('User added successfully:', data);
      
//     },
//     error => {
//       console.error('Error adding user:', error);
//     }
//   );
// }
// export class FormDialogLessonComponent implements OnInit {
//   lessonForm: FormGroup;
//   visibility:string[]=['EveryOne','Only Me'];
//   lessons: Lesson = new Lesson(); // Initialisez votre objet Lesson
//   fileToUpload: File | undefined; // Initialisez le fichier à télécharger avec undefined

//   //teachers: Teachers;
//   constructor(
//     public dialogRef: MatDialogRef<FormDialogLessonComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//     private classroomService: ClassroomService,
//     private lesson:LessonService,
//     // private absenceService : AbsenceService,
//     private fb: FormBuilder
//   ) {
//     this.lessonForm = this.fb.group({
//       lessonName: ['', Validators.required],
//       visibility: ['', Validators.required],
//       idClassroom: ['', Validators.required], 
//       //tasks: [[]], 
//       documents: [''] 
//     });
//     //this.proForm = this.createContactForm();
//   }
//   ngOnInit(): void {
//     // this.classroomForm.get('speciality')?.valueChanges.subscribe((speciality: string) => {
//     //   if (speciality) {
//     //     this.students$ = this.absenceService.getStudentBySpeciality(speciality);
//     //   } else {
//     //     this.students$ = new Observable<any[]>(observer => observer.next([]));
//     //   }
//     // });
//   }
//   // onSubmit(): void {
//   //   if (this.lessonForm.valid) {
//   //     const classroomId = this.lessonForm.value.idClassroom;
//   //     const lesson: Lesson = this.lessonForm.value;
//   //     const file: File | null = this.lessonForm.value.documents; // Assurez-vous que file est de type File ou null
  
//   //     if (file) {
//   //       this.lesson.addLesson(lesson, classroomId, file).subscribe({
//   //         next: (response) => {
//   //           console.log('lesson added successfully:', response);
//   //           // Gérer la réponse si nécessaire
//   //         },
//   //         error: (error) => {
//   //           console.error('Error adding the lesson: ', error);
//   //           // Gérer l'erreur si nécessaire
//   //         }
//   //       });
//   //     } else {
//   //       console.error('File is null');
//   //     }
//   //   } else {
//   //     console.error('Form is invalid');
//   //   }
//   // }
//   onSubmit(): void {
//     if (this.lessonForm.valid) {
//       const lesson: Lesson = this.lessonForm.value;
//       const file: File | null = this.lessonForm.value.documents;
//       const classroomId = this.lessonForm.value.idClassroom;
  
//       // Assuming you have a method to retrieve the default classroom by ID
//       this.classroomService.getClassroom(classroomId).subscribe({
//         next: (defaultClassroom) => {
//           if (defaultClassroom) {
//             // Set the default classroom ID in the form
//             this.lessonForm.patchValue({
//               idClassroom: defaultClassroom.idClassroom
//             });
  
//             if (file) {
//               this.lesson.addLesson(lesson, defaultClassroom, file).subscribe({
//                 next: (response) => {
//                   console.log('lesson added successfully:', response);
//                   // Handle success response if necessary
//                 },
//                 error: (error) => {
//                   console.error('Error adding the lesson: ', error);
//                   // Handle error response if necessary
//                 }
//               });
//             } else {
//               console.error('File is null');
//             }
//           } else {
//             console.error('Default classroom not found');
//           }
//         },
//         error: (error) => {
//           console.error('Error retrieving default classroom: ', error);
//           // Handle error response if necessary
//         }
//       });
//     } else {
//       console.error('Form is invalid');
//     }
//   }
  
// //   onSubmit(): void {
// //     // Vérifiez si this.fileToUpload est défini avant d'appeler addLesson
// //     if (this.fileToUpload) {
// //         // Utilisez this.fileToUpload! pour indiquer au compilateur TypeScript que vous êtes sûr que this.fileToUpload n'est pas undefined
// //         this.lesson.addLesson(this.lessons, this.lessons.classroom.idClassroom, this.fileToUpload!)
// //         .subscribe(
// //           next: (response) => {
// //                 console.log('Lesson added successfully:', response);
// //                 this.dialogRef.close();
// //             },
// //             error: (error) => {
// //                 console.error('Error adding the lesson:', error);
// //             }
// //         );
// //     } else {
// //         console.error('No file selected.');
// //     }
// // }

  
//   submit() {
//     // emppty stuff
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
