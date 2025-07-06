import mongoose from "mongoose";
import trip from "./trip.js";

const splitSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    amount:{type:Number, required:true}
})

const expenseSchema = new mongoose.Schema({
    tripId:{type:mongoose.Schema.ObjectId, ref:'trip', required:true},
    description:{type:String, required:true},
    amount:{type:Number, required:true},
    createdAt:{type:Date, default:Date.now},
})
const Expense = mongoose.model('expense', expenseSchema);

export default Expense