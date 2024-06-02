import { Component } from '@angular/core';
import { DataListComponent } from '../../data-area/data-list/data-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
