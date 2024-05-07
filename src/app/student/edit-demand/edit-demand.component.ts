import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DemandsService } from '../demande-liste/DemandService';
import { Demand } from '../demande-liste/Demand';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';



@Component({
  selector: 'app-edit-demand',
  standalone: true,
  
  templateUrl: './edit-demand.component.html',
  styleUrl: './edit-demand.component.scss',
  imports: [
    BreadcrumbComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule
  ],
})
export class EditDemandComponent {

  demandsForm: FormGroup;
  demandType: string[] = ['REGISTRATION_CERTIFICATE', 'ENROLLMENT_CERTIFICATE'];


  constructor(
    public dialogRef: MatDialogRef<EditDemandComponent>,
    public dialog: MatDialog,
    private location: Location,
    private demandService : DemandsService,private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: { demandId: number }
  ) 

  {
    this.demandsForm = this.fb.group({
      description: ['', [Validators.required]],
      demandType: [this.demandType, [Validators.required]]    
    });
  }






  
 

  updateDemand(demandId: number, data: any) {
    console.log('Updating demand with ID:', demandId);
    console.log('Data:', data);
  
    this.demandService.updateDemand(demandId, data).subscribe(
      () => {
        console.log('Demand edited successfully');
        this.dialogRef.close();
        window.location.reload(); // Reloads the page
      },
      (error) => {
        console.error('An error occurred while editing the demand:', error);
      }
    );
  }


  
    

}
