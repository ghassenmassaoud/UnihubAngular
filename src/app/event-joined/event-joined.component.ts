import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'app/models/event';
import { EventService } from 'app/services/event.service';
import { use } from 'echarts';


@Component({
  selector: 'app-event-joined',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-joined.component.html',
  styleUrls: ['../../assets/css/menus.css','../../assets/css/animate.css',
  '../../assets/css/animate.css','../../assets/css/owl.carousel.css','../../assets/fonts/elegant-icon.css','../../assets/css/magnific-popup.css',
  '../../assets/css/animations.css','../../assets/css/style.css','../../assets/css/custom-spacing.css','../../assets/css/responsive.css'
]
})
export class EventJoinedComponent {
  iduser!:number
  events:Event[]=[]
  RecEvents:Event[]=[]
  //const userId = 1;


  constructor(private Act : ActivatedRoute, private eventService:EventService, private router:Router){}
  ngOnInit(): void {

      this.loadJsFiles();
      //this.iduser= this.Act.snapshot.params['iduser']

    const userId =localStorage.getItem('IdUser');

   this.eventService.getEventListByUserId(userId as any).subscribe(data =>{
    console.log(data)
    this.events = data;
  }
  )

  this.eventService.RecommandedEventForUser(userId as any).subscribe(data =>{
    console.log(data)
    this.RecEvents=data;
  })






  }


  loadJsFiles(): void {
    this.loadExternalScript(" ../../assets/js/main.js");
    //  this.loadExternalScript(" ../../assets/js/menus.js");
    //  this.loadExternalScript(" ../../assets/js/jquery.min.js");
    // this.loadExternalScript(" ../../assets/js/modernizr-2.8.3.min.js");
    // this.loadExternalScript(" ../../assets/js/bootstrap.min.js");
    // this.loadExternalScript(" ../../assets/js/owl.carousel.min.js");
    // this.loadExternalScript(" ../../assets/js/jquery.magnific-popup.min.js");
    // this.loadExternalScript(" ../../assets/js/jquery.counterup.min.js");
    // this.loadExternalScript(" ../../assets/js/waypoints.min.js");
    // this.loadExternalScript(" ../../assets/js/wow.min.js");
    // this.loadExternalScript(" ../../assets/js/isotope.pkgd.min.js");
    // this.loadExternalScript(" ../../assets/js/imagesloaded.pkgd.min.js");
    // this.loadExternalScript(" ../../assets/js/plugins.js");



  }
  loadExternalScript(url: string): void {
    this.loadScript(url)
      .then(() => {
        console.log('Script loaded successfully');
      })
      .catch((error) => {
        console.error('Script loading failed:', error);
      });
  }
  loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;

      scriptElement.onload = () => {
        resolve();
      };

      scriptElement.onerror = (error) => {
        reject(error);
      };

      document.body.appendChild(scriptElement);
    });
  }
  }


