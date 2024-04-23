import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, PageLoaderComponent,HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isQuestionsPage!: boolean;
  currentUrl!: string;
  constructor(public _router: Router) {

    merge(
      this._router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ),
      this._router.events
    ).subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      // if (routerEvent instanceof NavigationEnd) {
      //   this.isQuestionsPage = routerEvent.url.includes('');
      // }
      window.scrollTo(0, 0);
    });
  }
}
