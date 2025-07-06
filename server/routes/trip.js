import express from "express";

import { createTrip, getMyTrips,getTripById } from "../controllers/trip.js";
import userAuth from "../middleware/userAuth.js";

const tripRouter = express.Router()

tripRouter.post('/createtrip', userAuth, createTrip)
tripRouter.get('/mytrips', userAuth, getMyTrips)
tripRouter.get('/gettrips/:tripId', userAuth, getTripById)

export default tripRouter