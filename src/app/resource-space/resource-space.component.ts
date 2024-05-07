import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RessourceSpace } from '@core/models/RessourceSpace';
import { RessourceServiceService } from '@core/service/ressource-service.service';

@Component({
  standalone:true,
  selector: 'app-resource-space',
  templateUrl: './resource-space.component.html',
  styleUrls: [
    '../../assets/css/menus.css',
    '../../assets/css/animate.css',
    '../../assets/css/owl.carousel.css',
    '../../assets/fonts/elegant-icon.css',
    '../../assets/css/magnific-popup.css',
    '../../assets/css/animations.css',
    '../../assets/css/style.css',
    '../../assets/css/custom-spacing.css',
    '../../assets/css/responsive.css',
    './resource-space.component.scss'
  ],
  imports :[ MatCardModule, CommonModule]
  
})
export class ResourceSpaceComponent implements OnInit {
  constructor(
    private spaceService: RessourceServiceService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  spaces: RessourceSpace[] = [];


  ngOnInit() {
    
    this.loadSpaces();
  }

  loadSpaces() {
    this.spaceService.getspaces().subscribe(
      spaces => {this.spaces = spaces;
  
  });
  }
  onCardClick(spaceId: number) {
    // Navigate to the other interface and pass the spaceId as a query parameter
    this.router.navigate(['/resources'], { queryParams: { spaceId } });
  }

  

  
}
