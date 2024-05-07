import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RessourceSpace } from '@core/models/RessourceSpace';
import { RessourceType } from '@core/models/RessourceType';
import { ressource } from '@core/models/ressource';
import { RessourceServiceService } from '@core/service/ressource-service.service';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';
import { number } from 'echarts';

export interface getDialogData{
  id: number;
  action:String;
  ress:ressource;
}
@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogClose,
  ],
  providers: [],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss'
})

export class DialogsComponent implements OnInit {
  ressourceForm !: FormGroup ;
  fileToUpload!: File ;
  ressources!: ressource;
  filname='';
  
  constructor(public dialogRef: MatDialogRef<DialogsComponent>,private fb: FormBuilder,private resourceService: RessourceServiceService) {}
  ngOnInit(): void {
    this.initForm() ;
  }
  initForm(): void {
     this .ressourceForm=this.fb.group({
      ressourceId: [null], 
      ressourceName: ['', Validators.required],
      fileData: [null, Validators.required], 
      ressourceType: [RessourceType, Validators.required], 
      description:['',Validators.required]
      
    });
  }
  
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      
      const file = event.target.files[0];
      this.fileToUpload=file;
      this.filname = file.name;
      this.ressourceForm.get('fileData');
    }
  }

  onSubmit(): void {
    if (this.ressourceForm.valid){
      let rName=this.ressourceForm.value.ressourceName;
      let rType=this.ressourceForm.value.ressourceType;
      let desc=this.ressourceForm.value.description;
      let spaceId=1;
      let userid=1;   //ADD User
      this.resourceService.addNewRessource(rName,rType,spaceId,this.fileToUpload,desc,userid).subscribe({
        next: (response: any) => {
          console.log('Resource added successfully:', response);        
        },
        error: (error) => {
          console.error('Error :', error);          
        }   
      });
      this.dialogRef.close();
      window.location.reload();
    } 
  }  
}

