import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Club } from 'app/models/club';
import { ClubService } from 'app/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myclub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myclub.component.html',
  styleUrls:  ['../../assets/css/menus.css','../../assets/css/animate.css',
  '../../assets/css/animate.css','../../assets/css/owl.carousel.css','../../assets/fonts/elegant-icon.css','../../assets/css/magnific-popup.css',
  '../../assets/css/animations.css','../../assets/css/style.css','../../assets/css/custom-spacing.css','../../assets/css/responsive.css'
]
})
export class MyclubComponent {
  clubId!:number
  clubs: Club[]=[];

  constructor(private myclubService: ClubService,private router: Router ){}
  

  ngOnInit(): void {
   // this.loadJsFiles();
    //hne bch nabda nekhdem nzid l partie tei ena 
   this.getClubs();
  }

  private getClubs(){
    this.myclubService.getClubList().subscribe(data => {
      console.log(data)
    this.clubs = data;

    });
  


}



redirectToCourse(clubId: number) {
  this.router.navigate(['/coureses-single', clubId]);
}
}
