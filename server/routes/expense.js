import express from "express";
import { addExpense, getTripExpense,deleteFunction } from "../controllers/expense.js";
import userAuth from "../middleware/userAuth.js";

const expenseRouter = express.Router()

expenseRouter.post('/addexpense', userAuth, addExpense)
expenseRouter.get('/getexpense/:tripId', userAuth, getTripExpense)
expenseRouter.delete('/delete/:expenseId', userAuth, deleteFunction)

export default expenseRouter