import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountOperationModel } from '../models/accountoperation.model';
import { appConfig } from '../app.config';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    // Get all operations of account
    public async getAccountOperations(accountNumber:number):Promise<AccountOperationModel[]> {
        const observable = this.http.get<AccountOperationModel[]>(appConfig.operationsUrl + accountNumber);
        const operations = await firstValueFrom(observable);
        return operations;
    }

    // Add account operation
    public async addAccountOperation(operation:AccountOperationModel):Promise<void> {
        const observable = this.http.post<AccountOperationModel>(appConfig.operationsUrl, operation);
        const addedOperation = await firstValueFrom(observable);
    }
}