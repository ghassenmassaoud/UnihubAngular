import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Complaint } from 'app/student/Complaints/Complaint';
import { ComplaintService } from 'app/student/Complaints/ComplaintService';

@Component({
  selector: 'app-Complaint-detail',
  standalone: true,
  templateUrl: './Complaint-detail.component.html',
  styleUrl: './Complaint-detail.component.scss',
  imports: [
    MatTableModule,
    DialogModule,
    CommonModule,
    HttpClientModule
  ],
})
export class ComplaintDetailComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  complaint!: Complaint;
  //data: Demand[] = []; // Variable pour stocker les données de demande
  dataSource: Complaint[] = []; // Variable pour le tableau de données

  private baseUrl = 'http://localhost:8081/api/api/complaints';

  constructor(
    public httpclient : HttpClient,
    public dialogRef: MatDialogRef<ComplaintDetailComponent>,
    public Matdialog: MatDialog,
    public dialog: Dialog,
    private complaintservice: ComplaintService,
    @Inject(MAT_DIALOG_DATA) public complaintt: any
  ) { super();
    this.complaint = complaintt;

  }



    ////////////////////ngOnInit//////////////////




  ngOnInit() {
    this.loadData();
    console.log(this.recommend(this.complaintt.description))
  }

  public loadData() {
    this.complaintservice = new ComplaintService(this.httpclient);
    this.subs.sink = this.complaintservice.getAllComplaints().subscribe((data) => {
      this.dataSource = (data);
    
  }
);



}
  
  


  






  ////////////////////getDemandById//////////////////

  
/*
  getDemandById(demandId: number) {
    this.demandService.getDemandById(demandId).subscribe(
      (demand: Demand) => {
        this.demand = demand;

        this.test=this.recommend(this.demand.description);

        console.log('Demand available');
      },
      (error) => {
        console.error('An error occurred while getting the demand:', error);
      }
    );

    this.dialogRef.close();






  }

*/
recommend(text: string): any {
  if (!text || text.trim().length === 0) {
    return 'Neutral';
  }

  text = text.toLowerCase();
  const words = [/teacher/, /grade/, /class/, /absence/];
  let list = [];

  for (const wordRegex of words) {
    if (wordRegex.test(text)) {
      if (wordRegex.toString() === '/teacher/') {
        list.push('Thank you for reaching out. We appreciate your feedback, and we will work to resolve the problem promptly.');
        list.push('Well received, we are going to look into the matter as soon as possible.');
        list.push('Well received, please give us more details.');
        list.push('Well received, we will call you after investigating more the problem.');
      }
      if (wordRegex.toString() === '/grade/') {
        list.push('Well received, we are going to look into the matter as soon as possible.');
        list.push('Well received, please give us more details.');
        list.push('Well received, we will call you after investigating more the problem.');
        list.push('We have received your concern. Rest assured, we will conduct a thorough investigation into the grade-related matter and provide you with an update.');
      }
      if (wordRegex.toString() === '/class/') {
        list.push('Thank you for your message. We will review the class availability and get back to you shortly.');
        list.push('Well received, we are going to check the class availability and respond to you.');
        list.push('Well received, please give us your reservation details.');
        list.push('Well received, thank you, we will fix all.');

      }
      if (wordRegex.toString() === '/absence/') {
        list.push('Thank you for bringing this to our attention. We will investigate the matter with your teacher and take the necessary steps to correct the mistake.');
        list.push('We acknowledge your message. In order to address your absence, please provide us with a sickness certificate as proof.');
        list.push('Well received, thank you, we will fix the problem.');
        list.push('Thank you for notifying us. We assure you that we will investigate the problem and take appropriate corrective measures.');
      }
    }
  }

  return list;
}







  sendmail(msg :string) {

    console.log(msg)
    this.complaintservice.send(msg).subscribe();

  
  }

////////////////////// setDemandAsSeen/////////////////////





  setComplaintAsSeen(complaintId: number) {
    this.complaintservice.setComplaintAsSeen(complaintId).subscribe(
      () => { 
        console.log('Complaint seen');  
      },
      (error) => {
        console.error('An error occurred while changing status of the Complaint:', error);
      },
      ()=>this.ngOnInit()
      
    );
    this.dialogRef.close();
  }

  


  

}