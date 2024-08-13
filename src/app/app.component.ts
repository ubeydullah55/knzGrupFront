import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './include/front/footer/footer.component';
import { HomapageComponent } from './pages/front/homapage/homapage.component';
import { HeaderComponent } from './include/front/header/header.component';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HeaderComponent,HomapageComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'KNZGROUP';
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // URL'de '/admin' var mı kontrol et
        this.showHeader = !event.url.includes('/admin');
      }
    });
  }
}
