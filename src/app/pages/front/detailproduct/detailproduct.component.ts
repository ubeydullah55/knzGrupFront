import { Component ,OnInit} from '@angular/core';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [],
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css'
})
export class DetailproductComponent implements OnInit {
  item: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.item = this.dataService.getData();
  }

}
