import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { DatePipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { sort } from 'd3';
import { DemandsService } from './DemandService';
import { Demand } from './Demand';

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
  ],

})
export class DemandeListeComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
    dataSource!: MatTableDataSource<Demand>;
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

  constructor(
    public HttpClient: HttpClient,
    private DemandService: DemandsService
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.DemandService = new DemandsService(this.HttpClient);
    this.subs.sink = this.DemandService.getAllDemands().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.data = data;
      this.dataLength = data.length;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


