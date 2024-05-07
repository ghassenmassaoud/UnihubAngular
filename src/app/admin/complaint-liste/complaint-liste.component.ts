import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Complaint } from 'app/student/Complaints/Complaint';
import { ComplaintService } from 'app/student/Complaints/ComplaintService';
import { DeleteComplaintDialogComponent } from './delete-complaint-dialog/delete-complaint-dialog.component';
import { DemandDetailComponent } from 'app/student/demand-detail/demand-detail.component';
import { ComplaintDetailComponent } from './Complaint-detail/Complaint-detail.component';

@Component({
  selector: 'app-complaint-liste',
  standalone: true,

  templateUrl: './complaint-liste.component.html',
  styleUrl: './complaint-liste.component.scss',
  imports: [
    BreadcrumbComponent,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatPaginatorModule,
    DatePipe,
    FormsModule,
    CommonModule
  ],
})
export class ComplaintListeComponent extends UnsubscribeOnDestroyAdapter
implements OnInit {

  dataSource : Complaint[]=[];

  dataLength?: number;
  

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;


  displayedColumns = [
    
    'complaintId',
    'description',
    'complaintType',
    'title',
    'status',
  ];

  breadscrums = [
    {
      title: 'Complaints',
      items: ['Admin'],
      active: 'Complaints',
    },
  ];
  private baseUrl = 'http://localhost:8081/api/api/complaints';


  constructor(
      
    public HttpClient: HttpClient,
    private complaintservice: ComplaintService,
    public dialog: MatDialog
  ) {
    super();
  }


  deleteComplaint(complaintId: number) {
    
    const dialogRef = this.dialog.open(DeleteComplaintDialogComponent, {
      data: { complaintId: complaintId }

    });


    dialogRef.afterClosed().subscribe(

      ()=>this.ngOnInit());
    }



    setComplaintAsSeen(complaintId : number){
      this.complaintservice.setComplaintAsSeen(complaintId)
      //this.dialogRef.close();
  
    }



  ngOnInit() {
    this.loadComplaints();
  }
  

  loadComplaints() {
    
    this.complaintservice = new ComplaintService(this.HttpClient);
    this.subs.sink = this.complaintservice.getAllComplaints().subscribe((data) => {
      this.dataSource = (data);

      

    });


  }

//   deleteComplaint(complaintId: number) {
//     const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
//       data: { complaintId: complaintId }
//     });

//     dialogRef.afterClosed().subscribe(

//       ()=>this.ngOnInit())

// }

openComplaintDialog(complaint: any): void {
  const dialogRef = this.dialog.open(ComplaintDetailComponent, {
    data: complaint
  });
}





}
