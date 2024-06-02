import { Document, Schema, model } from "mongoose";

// Interface describing the needed document
export interface IAccountOperationModel extends Document {
    accountNumber:number;
    type:string;
    sum:number;
    date:Date;
    interest:number;
    payments:number;
}

// Schema describing document, validation, and more
export const AccountOperationSchema = new Schema<IAccountOperationModel>({
    accountNumber: {
        type: Number,
        required: [true, "Missing account number"]
    },
    type: {
        type: String,
        required: [true, "Missing type"],
        // type has to be one out of the following
        enum: ["deposit", "withdrawal", "loan"]
    },
    sum: {
        type: Number,
        required: [true, "Missing sum"],
        min: [1, "Sum has to be positive"]
    },
    date: {
        type: Date,
        required: [true, "Missing date"]
    },
    interest: {
        type: Number,
        // required only if the type of operation is a loan
        required: function() {return this.type === "loan"}
    },
    payments: {
        type: Number,
        // required only if the type of operation is a loan
        required: function() {return this.type === "loan"}
    }
});

// Model - actual class to work with
export const AccountOperationModel = model<IAccountOperationModel>("AccountOperationModel", AccountOperationSchema, "AccountOperations");