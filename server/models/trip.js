import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    tripName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
})

const trip = mongoose.model('trip', tripSchema)

export default trip