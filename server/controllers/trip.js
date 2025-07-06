import trip from "../models/trip.js";

export const createTrip = async (req, res) => {
    const { tripName, startDate, endDate } = req.body
    if (!tripName || !startDate || !endDate) {
        return res.json({
            success: false,
            message: 'Enter trip name, start date and end date to continue'
        })
    }
    try {
        const newTrip = new trip({
            tripName,
            startDate,
            endDate,
            createdBy: req.userId,
            members: [req.userId]
        })

        await newTrip.save()

        return res.json({
            success: true,
            message: 'Trip created successfully'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const getMyTrips = async (req, res) => {
    try {
        const trips = await trip.find({ members: req.userId }).populate('members', 'name email');
        return res.status(200).json({
            success: true,
            trips
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getTripById = async (req, res) => {
    const { tripId } = req.params;

    try {
        const tripDetail = await trip.findById(tripId);

        if (!tripDetail) {
            return res.json({
                success: false,
                message: 'Trip not found',
            });
        }

        if (!tripDetail.members.includes(req.userId)) {
            return res.json({
                success: false,
                message: 'Unauthorized access',
            });
        }

        return res.json({
            success: true,
            trip: tripDetail,
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};