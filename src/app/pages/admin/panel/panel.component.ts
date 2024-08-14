import { Component } from '@angular/core';
import { teklifModel } from '../../../models/teklifModel';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  public teklif :teklifModel[]=[
    { teklifid: 1, adsoyad: 'ubeydullah doğan',mail:'d.ubeydullah@gmail.com',tel:'05541897255',tarih:'2011/04/25',tutar:72},
    { teklifid: 2, adsoyad: 'ali osman çolak',mail:'a.colak@gmail.com',tel:'05451895412',tarih:'2011/04/19',tutar:123}
  ];

  getAllTeklif(){
    return this.teklif;
  }
}
