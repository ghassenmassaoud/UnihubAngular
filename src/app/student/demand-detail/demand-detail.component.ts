import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DemandsService } from '../demande-liste/DemandService';
import { Demand } from '../demande-liste/Demand';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-detail',
  standalone: true,
  templateUrl: './demand-detail.component.html',
  styleUrl: './demand-detail.component.scss',
  imports: [
    MatTableModule,
    DialogModule,
    CommonModule,
    HttpClientModule
  ],
})
export class DemandDetailComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
test:any;
  demand: Demand;
  //data: Demand[] = []; // Variable pour stocker les données de demande
  dataSource: Demand[] = []; // Variable pour le tableau de données

  private baseUrl = 'http://localhost:8081/demands';

  constructor(
    public httpclient : HttpClient,
    public dialogRef: MatDialogRef<DemandDetailComponent>,
    public Matdialog: MatDialog,
    public dialog: Dialog,
    private route: Router,
    private demandService: DemandsService,
    @Inject(MAT_DIALOG_DATA) public demande: any
  ) { super();
    this.demand = demande;

  }



    ////////////////////ngOnInit//////////////////




  ngOnInit() {
    this.loadData();
    console.log(this.recommend(this.demand.description))
  }

  public loadData() {
    this.demandService = new DemandsService(this.httpclient);
    this.subs.sink = this.demandService.getAllDemands().subscribe((data) => {
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
  const words = [/urgent/, /document/, /request/, /inquiry/];
  let list = [];

  for (const wordRegex of words) {
    if (wordRegex.test(text)) {
      if (wordRegex.toString() === '/urgent/') {
        list.push('Thank you for your message. We have received it and will proceed with your request immediately.');
        list.push('Well received, please provide more details about your urgent request.');
        list.push('Thank you for reaching out. We will prioritize and address your urgent matter promptly.');
      }
      if (wordRegex.toString() === '/document/' || wordRegex.toString() === '/request/') {
        list.push('Thank you for your document request. We will process it and provide a response soon.');
        list.push('Well received, please provide the necessary details for your document request.');
        list.push('Thank you for your inquiry. We will assist you with your document request as quickly as possible.');
      }
      if (wordRegex.toString() === '/inquiry/') {
        list.push('Thank you for your inquiry. We will respond to your questions and provide the necessary information.');
        list.push('Well received, please provide more details or specific questions for your inquiry.');
        list.push('Thank you for reaching out. We will address your inquiry and provide a comprehensive response.');
      }
    }
  }

  return list;
}







  sendmail(msg :string) {

    console.log(msg)
    this.demandService.send(msg).subscribe();


  }

////////////////////// setDemandAsSeen/////////////////////





  setDemandAsSeen(demandId: number) {
    this.demandService.setDemandAsSeen(demandId).subscribe(
      // () => {
      //   console.log('Demand seen');
      // },
      // (error) => {
      //   console.error('An error occurred while changing status of the demand:', error);
      // },


    );
    this.dialogRef.close();
    console.log("abddouuu")
    // this.route.navigate(['/admin/attendance/Demands']);
this.ngOnInit()
  }






}