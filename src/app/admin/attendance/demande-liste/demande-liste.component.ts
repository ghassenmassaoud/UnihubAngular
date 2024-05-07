import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CommonModule, DatePipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { sort } from 'd3';
import { DemandsService } from './DemandService';
import { Demand } from './Demand';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DemandDetailComponent } from 'app/student/demand-detail/demand-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-liste',
  standalone: true,
  templateUrl: './demande-liste.component.html',
  styleUrl: './demande-liste.component.scss',


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
  export class DemandeListeComponent extends UnsubscribeOnDestroyAdapter
    implements OnInit {
      //dataSource

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
        title: 'Demands',
        items: ['Student'],
        active: 'Demands',
      },
    ];
    private baseUrl = 'http://localhost:8081/demands';


    constructor(

      public HttpClient: HttpClient,
      private DemandService: DemandsService,
      public dialog: MatDialog,

    ) {
      super();
    }





    deleteDemand(demandId: number) {
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        data: { demandId: demandId }
      });

      dialogRef.afterClosed().subscribe(

        ()=>this.ngOnInit()



        // result => {
        // // Handle the result after the dialog is closed
        // if (result === 'confirm') {
        //   // Perform the delete operation
        //   console.log('Deleting demand with ID:', demandId);

        // }

      // }
    );
    }


    getDemandById(demandId: number) {
      const dialogRef = this.dialog.open(DemandDetailComponent, {
        data: { demandId: demandId }
      });

      dialogRef.afterClosed().subscribe(

        ()=>this.ngOnInit()



        // result => {
        // // Handle the result after the dialog is closed
        // if (result === 'confirm') {
        //   // Perform the delete operation
        //   console.log('Deleting demand with ID:', demandId);

        // }

      // }
    );
    }

    setDemandAsSeen(demandId : number){
      this.DemandService.setDemandAsSeen(demandId)

      //this.dialogRef.close();

    }

    openDemandDialog(demande: any): void {
      const dialogRef = this.dialog.open(DemandDetailComponent, {
        data: demande
      });
    }







    // ngOnInit() {
    //   this.loadData();
    // }


    public loadData() {

      this.DemandService = new DemandsService(this.HttpClient);
      this.subs.sink = this.DemandService.getAllDemands().subscribe((data) => {
        this.dataSource = (data);


      });


    }

    numberOfDemands!: number;
    ngOnInit() {
      this.loadData();
      this.Numberofdemands();
      this.countWeeklyDemands();
      this.countDailyDemands();
      this.countMonthlyDemands();
    }

    Numberofdemands() {
      this.DemandService.getNumberOfDemands().subscribe(
        (count) => {
          this.numberOfDemands = count;
        },
        (error) => {
          console.error('Error retrieving number of demands:', error);
        }
      );
    }
    weeklyDemandsCount: number = 0;



    countWeeklyDemands() {
      this.DemandService.countWeeklyDemands().subscribe(
        (count) => {
          this.weeklyDemandsCount = count;
        },
        (error) => {
          console.error('Error retrieving count of weekly demands:', error);
        }
      );
    }


    dailyDemandsCount: number = 0;

    countDailyDemands() {
      this.DemandService.countDailyDemands().subscribe(
        (count) => {
          this.dailyDemandsCount = count;
        },
        (error) => {
          console.error('Error retrieving count of daily demands:', error);
        }
      );
    }
    monthlyDemandsCount: number = 0;

    countMonthlyDemands() {
      this.DemandService.countMonthlyDemands().subscribe(
        (count) => {
          this.monthlyDemandsCount = count;
        },
        (error) => {
          console.error('Error retrieving count of monthly demands:', error);
        }
      );
    }







  }







