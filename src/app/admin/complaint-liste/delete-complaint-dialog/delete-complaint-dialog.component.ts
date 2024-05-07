import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Complaint } from 'app/student/Complaints/Complaint';
import { ComplaintService } from 'app/student/Complaints/ComplaintService';

@Component({
  selector: 'app-delete-complaint-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-complaint-dialog.component.html',
  styleUrl: './delete-complaint-dialog.component.scss'
})
export class DeleteComplaintDialogComponent {



  constructor(
    public dialogRef: MatDialogRef<DeleteComplaintDialogComponent>,
    public dialog: MatDialog,
    //private location: Location,
    private complaintservice : ComplaintService,
    @Inject(MAT_DIALOG_DATA) public data: { complaintId: number }


  ) {}

  dataSource : Complaint[]=[];

  


  deleteComplaint(complaintId: number) {
    this.complaintservice.deleteComplaint(complaintId).subscribe(
      () => {
        console.log('Complaint deleted successfully');
        // this.location.reload(); // Rafraîchir la page
      },
      (error) => {
        // Gérer la réponse d'erreur ou afficher un message d'erreur
        console.error('An error occurred while deleting the Complaint:', error);
      }
    );
    this.dialogRef.close();
  }
}
