import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DemandsService } from '../DemandService';
import { Demand } from '../Demand';
import { MatTableModule } from '@angular/material/table';




@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
  imports: [
   
    MatTableModule,
   
  ],
   
})
export class DeleteConfirmationDialogComponent {

  
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    public dialog: MatDialog,
    private location: Location,
    private demandService : DemandsService,
    @Inject(MAT_DIALOG_DATA) public data: { demandId: number },
    @Inject(MAT_DIALOG_DATA) public data1: { complaintId: number }


  ) {}







  dataSource : Demand[]=[];

  
  deleteDemand(demandId: number) {
    this.demandService.deleteDemand(demandId).subscribe(
      () => {
        console.log('Demand deleted successfully');
        this.location.reload(); // Rafraîchir la page
      },
      (error) => {
        // Gérer la réponse d'erreur ou afficher un message d'erreur
        console.error('An error occurred while deleting the demand:', error);
      }
    );
    this.dialogRef.close();
  }

 
    
   
  
    
  

}
