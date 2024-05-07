import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ressource } from '@core/models/ressource';
import { RessourceServiceService } from '@core/service/ressource-service.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { ShowDetailComponent } from './dialogs/show-detail/show-detail.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resources',
  standalone: true,
  templateUrl: './resources.component.html',
  styleUrls: [
    '../../assets/css/animate.css',
    '../../assets/css/animate.css',
    '../../assets/css/owl.carousel.css',
    '../../assets/fonts/elegant-icon.css',
    '../../assets/css/magnific-popup.css',
    '../../assets/css/animations.css',
    '../../assets/css/style.css', 
    '../../assets/css/custom-spacing.css',
    '../../assets/css/responsive.css',
    './resources.component.scss'
  ],
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent
  ]
})
export class ResourcesComponent {

  breadscrums = [
    {
      title: 'All ressources',
      items: ['ressource'],
      active: 'All ressources',
    },
  ];
  spaceId!: number;
  ressources!: ressource[];
  respop!: ressource[]
  constructor(private resourceService: RessourceServiceService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.spaceId = params['spaceId'];
      this.loadRessources(this.spaceId);
    });


    this.getPopulaire();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.resourceService.sendCookies()
      }
    });

  }
  getPopulaire() {
    this.resourceService.getPrp().subscribe(
      data => this.respop = data
    )
  }
  loadRessources(spaceId: number) {
    this.resourceService.getRessourcesBySpaceId(spaceId).subscribe(
      data => this.ressources = data
    )
  }



  addNewResource() {
    const dialogRef = this.dialog.open(DialogsComponent, {
      data: {
        //width: '640px',
        disableClose: true,
      }
    });
  }

  showdetails(_t52: ressource) {
    console.log(_t52);
    const parts: string[] = _t52.fileName.split("_");
    const originalFileName: string = parts.slice(1).join("_");
    console.log(originalFileName);
    const dialogRef = this.dialog.open(ShowDetailComponent, {
      data: { resource: _t52, fileName: originalFileName }
    })
    this.resourceService.behaviour(_t52).subscribe({
      next: (response: any) => {
        console.log('success', response);
      },
      error: (error) => {
        console.error('Error :', error);
      }
    }
    );
  }

}
