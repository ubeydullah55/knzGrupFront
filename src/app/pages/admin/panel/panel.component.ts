import { Component } from '@angular/core';
import { teklifModel } from '../../../models/teklifModel';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppConfig } from '../../../config/app.config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit{

  api_url = `${AppConfig.apiUrl}/siparis`;
 // siparisApi$=this.getAllSiparisApi();

  siparis: teklifModel[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllSiparisApi().subscribe(data => {
      this.siparis = data.sort((a, b) => b.siparisid - a.siparisid);
      this.initializeDataTable();
    });

  }
  initializeDataTable() {
    // Yükleme tamamlandıktan sonra tabloyu başlatın
    setTimeout(() => {
      new DataTable("#datatablesSimple", {
        perPage: 25,
        perPageSelect: [10, 25, 50, 100],
        searchable: true,
        sortable: true
      });
    }, 200);
  }
  siparisDelete(id: number) {
    Swal.fire({
      title: 'Seçili siparişi silmek istediğinize emin misiniz?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Evet',
      denyButtonText: 'Hayır',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${this.api_url}/${id}`;
        this.http.delete(url).subscribe({
          next: () => {
            this.siparis = this.siparis.filter(item => item.siparisid !== id);
          },
          error: (err) => {
            console.error('Silme işlemi başarısız oldu:', err);
          }
        });
     
      } else if (result.isDenied) {
        return;
      }
    });
  }
  getAllSiparisApi(){
    return this.http.get<[teklifModel]>(this.api_url);
  }
  trackById(index: number, item: teklifModel): number {
    return item.siparisid;  // veya item.id, öğe için benzersiz bir özellik kullanın
  }
}
