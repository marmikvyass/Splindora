import Expense from "../models/expense.js";
import trip from "../models/trip.js";


export const addExpense = async (req, res) => {
    const {tripId, description, amount } = req.body
    if (!tripId || !description || !amount) {
        return res.json({
            success: false,
            message: 'All fields are required'
        })
    }

    try {
        const tripexp = await trip.findById(tripId)
        if (!tripexp) {
            return res.json({
                success: false,
                message: 'Trip not found'
            })
        }

        if (!tripexp.members.includes(req.userId)) {
            return res.json({
                success: false,
                message: 'Unauthorized for this trip'
            })
        }

        const newExpense = new Expense({
            tripId: tripexp._id,
            description,
            amount,
        })

        await newExpense.save()

        return res.json({
            success: true,
            message: 'Expense added successfully'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getTripExpense = async (req, res) => {
    const { tripId } = req.params
    try {
        const getTripExp = await trip.findById(tripId)
        if (!getTripExp) {
            return res.json({
                success: false,
                message: 'Trip not found'
            })
        }
        if (!getTripExp.members.includes(req.userId)) {
            return res.json({
                success: false,
                message: 'Unauthorized for this trip'
            })
        }

        const expenses = await Expense.find({ tripId: getTripExp._id })
        const total = expenses.reduce((sum, e) => sum + e.amount, 0)
        return res.json({
            success: true,
            expenses,
            totalBudget: total
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteFunction = async (req, res) => {
    const { expenseId } = req.params

    try {
        const delexpense = await Expense.findById(expenseId)
        if (!delexpense) {
            return res.json({
                success: false,
                message: 'Expense not found'
            })
        }

        await Expense.findByIdAndDelete(expenseId)
        return res.json({ success: true, message: 'Expense deleted successfully' });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}