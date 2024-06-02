import express, { NextFunction, Request, Response } from "express";
import { accountOperationsLogic } from "../logic/accountoperations-logic";
import { AccountOperationModel } from "../models/accountoperation-model";

// Data controller:
class DataController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    // Register routes:
    private registerRoutes(): void {
        this.router.get("/accountOperations/:accountNumber", this.getAccountOperations);
        this.router.post("/accountOperations", this.addAccountOperation);
    }

    // GET http://localhost:4000/api/accountOperations/:accountNumber
    private async getAccountOperations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const operations = await accountOperationsLogic.getAccountOperations(+request.params.accountNumber);
            response.json(operations);
        }
        catch (err: any) { next(err); }
    }

    // POST http://localhost:4000/api/accountOperations
    private async addAccountOperation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const operation = new AccountOperationModel(request.body);
            const addedOperation = await accountOperationsLogic.addAccountOperation(operation);
            response.json(addedOperation);
        }
        catch (err: any) { next(err); }
    }
}

const dataController = new DataController();
export const dataRouter = dataController.router;
