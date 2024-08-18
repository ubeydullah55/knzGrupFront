import { Component } from '@angular/core';
import { teklifModel } from '../../../models/teklifModel';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { RouterModule } from '@angular/router'; // Import RouterModule
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit{

  api_url='https://localhost:7266/api/siparis';
  siparisApi$=this.getAllSiparisApi();

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
        perPage: 10,
        perPageSelect: [10, 25, 50, 100],
        searchable: true,
        sortable: true
      });
    }, 0);
  }

  getAllSiparisApi(){
    return this.http.get<[teklifModel]>(this.api_url);
  }
  trackById(index: number, item: teklifModel): number {
    return item.siparisid;  // veya item.id, öğe için benzersiz bir özellik kullanın
  }
}
