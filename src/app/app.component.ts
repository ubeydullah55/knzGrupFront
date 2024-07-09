import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './include/front/footer/footer.component';
import { HomapageComponent } from './pages/front/homapage/homapage.component';
import { HeaderComponent } from './include/front/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,HomapageComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'costare';
}
