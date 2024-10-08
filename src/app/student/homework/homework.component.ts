import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HomeworkService } from './homework.service';
import { Homework } from './homework.modal';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CommonModule, DatePipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatPaginatorModule,
    DatePipe,
    CommonModule
  ],
})
export class HomeworkComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  dataSource!: MatTableDataSource<Homework>;
  dataLength?: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = [
    'class',
    'section',
    'subject',
    'homeworkDate',
    'submissionDate',
    'evalutionDate',
    'status',
  ];

  breadscrums = [
    {
      title: 'Homework',
      items: ['Student'],
      active: 'Homework',
    },
  ];

  constructor(
    public httpClient: HttpClient,
    private homeworkService: HomeworkService
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.homeworkService = new HomeworkService(this.httpClient);
    this.subs.sink = this.homeworkService.getAllHomework().subscribe((data) => {
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
