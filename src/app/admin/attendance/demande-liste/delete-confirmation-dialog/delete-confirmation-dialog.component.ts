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
    private demandService : DemandsService,
    @Inject(MAT_DIALOG_DATA) public data: { demandId: number }
  ) {}







  dataSource : Demand[]=[];

  
  deleteDemand(demandId: number) {
    this.demandService.deleteDemand(demandId).subscribe(
      () => { console.log('Demand deleted successfully');  
      },
      (error) => {
        // Handle error response or display an error message
        console.error('An error occurred while deleting the demand:', error);
      }
    
      )
      this.dialogRef.close();
    }
    
   
  
    
  

}
