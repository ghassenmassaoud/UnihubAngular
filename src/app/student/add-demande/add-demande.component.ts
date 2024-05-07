import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//import { DemandsService } from 'C:\Users\abdou\PiDevArcticFrontend-master\src\app\admin\attendance\demande-liste\DemandService.ts';
import { Demand } from '../demande-liste/Demand';
import { demandType } from '../demande-liste/DemandType';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DemandsService } from '../demande-liste/DemandService';

@Component({
  selector: 'app-add-demande',
  standalone: true,

  templateUrl: './add-demande.component.html',
  styleUrl: './add-demande.component.scss',
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
export class AddDemandeComponent implements OnInit {

  demandsForm: FormGroup;
  demandType: string[] = ['REGISTRATION_CERTIFICATE', 'ENROLLMENT_CERTIFICATE'];


  breadscrums = [
    {
      title: 'ADD DEMAND',
      items: ['student'],
      active: 'ADD DEMAND',
    },
  ];

  constructor(private demandService: DemandsService, private fb: FormBuilder) {
    this.demandsForm = this.fb.group({
      description: ['', [Validators.required]],
      demandType: [demandType, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getNumberOfUnseenDemands();
    this.getNumberOfSeenDemands();
  }


  redirectToSeenDemands() {
    window.location.href = 'http://localhost:4200/#/main/SeenDemands';
  }

  redirectToUnSeenDemands() {
    window.location.href = 'http://localhost:4200/#/main/UnSeenDemands';
  }

  onSubmit(): void {
    if (this.demandsForm.valid) {
      const formValue = this.demandsForm.value;
      const demand: Demand = {
        demandId: 0,
        description: formValue.description,
        demandType: formValue.demandType as demandType,
        creationDate: new Date(),
        status: false
      };

      this.demandService.addDemand(demand).subscribe({
        next: (response) => {
          console.log('Demand added successfully:', response);
          // Reset form after adding
          this.demandsForm.reset();
          // Refresh the page
          window.location.reload();
        },
        error: (error) => {
          console.error('Error adding Demand:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  numberOfSeenDemands: number = 0;


getNumberOfSeenDemands() {
  this.demandService.getNumberOfSeenDemands().subscribe(
    (count : number) => {
      this.numberOfSeenDemands = count;
    },
    (error : any) => {
      console.error('Error retrieving count of seen demands:', error);
    }
  );
}


numberOfUnseenDemands: number = 0;

getNumberOfUnseenDemands() {
  this.demandService.getNumberOfUnseenDemands().subscribe(
    (count : number) => {
      this.numberOfUnseenDemands = count;
    },
    (error : any) => {
      console.error('Error retrieving count of unseen demands:', error);
    }
  );
}
}
