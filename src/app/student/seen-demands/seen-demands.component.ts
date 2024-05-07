import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Demand } from '../demande-liste/Demand';
import { MatDialog } from '@angular/material/dialog';
import { DemandsService } from '../demande-liste/DemandService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../demande-liste/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-seen-demands',
  standalone: true,
  
  templateUrl: './seen-demands.component.html',
  styleUrl: './seen-demands.component.scss',
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
export class SeenDemandsComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{

  
  dataSource : Demand[]=[];

dataLength?: number;


@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;


displayedColumns = [
  'Demand ID',
  'Description',
  'Demand Type',
  'Creation Date',
  'status',
];

breadscrums = [
  {
    title: 'Student',
    items: ['Demands'],
    active: 'Seen Demands',
  },
];
//private baseUrl = 'http://localhost:8081/demands';


redirectToSeenDemands() {
  window.location.href = 'http://localhost:4200/#/student/SeenDemands';
}


constructor(

  private router: Router,
  public HttpClient: HttpClient,
  private DemandService: DemandsService,
  public dialog: MatDialog
) {
  super();
}



// deleteDemand(demandId: number) {
//   this.DemandService.deleteDemand(demandId).subscribe(
//     () => { console.log('Demand deleted successfully');  
//     },
//     (error) => {
//       // Handle error response or display an error message
//       console.error('An error occurred while deleting the demand:', error);
//     }
  
//     )
    
//   }

  deleteDemand(demandId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { demandId: demandId }
    });

    dialogRef.afterClosed().subscribe(

      ()=>this.ngOnInit());
    }


ngOnInit() {
  this.loadData();
}


public loadData() {
  this.DemandService = new DemandsService(this.HttpClient);
  this.subs.sink = this.DemandService.getAllSeenDemands().subscribe((data) => {
    this.dataSource = (data);
    console.log(data[1].description)
  
});
}
}