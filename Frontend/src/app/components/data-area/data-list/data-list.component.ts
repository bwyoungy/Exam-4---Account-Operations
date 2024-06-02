import { Component } from '@angular/core';
import { AccountOperationModel } from '../../../models/accountoperation.model';
import { DataService } from '../../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css'
})
export class DataListComponent {
  public accountNumber: number;
  public operations: AccountOperationModel[];

  public constructor(private dataService:DataService) {}

  public async display() {
    try {
      if(!this.accountNumber) {
        this.operations = null;
        return;
      }
      this.operations = await this.dataService.getAccountOperations(this.accountNumber);
    } catch (error:any) {
      alert(error.message);
    }
  }
}
