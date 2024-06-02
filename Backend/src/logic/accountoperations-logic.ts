import { AccountOperationModel, IAccountOperationModel } from "../models/accountoperation-model";
import { ValidationError } from "../models/client-errors";

class AccountOperationsLogic {
    // Get account operations by account number
    public async getAccountOperations(accountNumber:number):Promise<IAccountOperationModel[]> {
        return AccountOperationModel.find({accountNumber: {$eq:accountNumber}}).exec();
    }

    // Add account operation
    public async addAccountOperation(operation:IAccountOperationModel):Promise<IAccountOperationModel> {
        const errors = operation.validateSync();
        if(errors) throw new ValidationError(errors.message);
        return operation.save();
    }
}

export const accountOperationsLogic = new AccountOperationsLogic();