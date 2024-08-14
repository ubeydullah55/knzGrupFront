import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headeradmin',
  standalone: true,
  imports: [],
  templateUrl: './headeradmin.component.html',
  styleUrl: './headeradmin.component.css'
})
export class HeaderadminComponent {
  constructor(private router: Router) {
    
  }
  ngOnInit() {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      if (!sessionStorage.getItem('loginControl') || sessionStorage.getItem('loginControl') !== 'true') {
        this.router.navigate(['/admin']);
      }
    }
  }
  killLoginSession(){
    sessionStorage.setItem('loginControl', 'false');
    this.router.navigate(['/admin']);
  }
}
