import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { AccountOperationModel } from '../../../models/accountoperation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent {
  public operation = new AccountOperationModel();
  public types = ["deposit", "withdrawal", "loan"];

  public constructor(private dataService:DataService, private router:Router) {}

  public async send():Promise<void> {
    try {
      this.operation.date = new Date();
      console.log(this.operation);
      
      await this.dataService.addAccountOperation(this.operation);
      alert("Account Operation has been added");
      this.router.navigateByUrl("/home");
    } catch (error:any) {
      alert(error.message);
    }
  }

}
