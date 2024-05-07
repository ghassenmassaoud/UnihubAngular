import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RessourceServiceService } from '@core/service/ressource-service.service';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule],


  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss'
})
export class ShowDetailComponent {





  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private resourceService: RessourceServiceService ) {}

  ngOnInit() {
    
  }
  showCard: boolean = true;

 
  toggleCard() {
    this.showCard = !this.showCard;
  }
  downloadFile(arg0: any) {
    this.resourceService.download(arg0)
    ;
  }
}
