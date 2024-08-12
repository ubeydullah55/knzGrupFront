import { AfterViewInit,Component } from '@angular/core';


@Component({
  selector: 'app-referanslar',
  standalone: true,
  imports: [],
  templateUrl: './referanslar.component.html',
  styleUrl: './referanslar.component.css'
})
export class ReferanslarComponent implements AfterViewInit  {
  ngAfterViewInit() {
    this.loadImages();
  }

  loadImages() {
    const container = document.getElementById('image-container');
    if (!container) {
      console.error('Container element not found');
      return;
    }

    // Resim URL'leri oluştur
    for (let i = 1; i <= 74; i++) {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-lg-3 col-xxl-3 mb-5';
      colDiv.innerHTML = `
        <div class="card bg-light border-1 h-70">
          <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">                         
            <img src="assets/cozastore-master/images/referanslar/r${i}.png" alt="IMG" style="max-width: 100%; height: auto; display: block;">
          </div>
        </div>
      `;
      container.appendChild(colDiv);
    }
  
  }
}
