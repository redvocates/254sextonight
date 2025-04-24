import mongoose from "mongoose"
import EventsModel from "@/models/events.model.js"

export async function getEventsController(request, response) {
    try {
        let { page, limit, search } = request.body

        page = page || 1
        limit = limit || 10

        const today = new Date()
        today.setHours(0, 0, 0, 0) // Ensure we compare only the date part

        const query = search
            ? { 
                $text: { $search: search },
                verified: true,
                dateofevent: { $gte: today } // Show only future events
            }
            : { 
                verified: true,
                dateofevent: { $gte: today } 
            }

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            EventsModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            EventsModel.countDocuments(query)
        ])

        return response.json({
            message: "Events data",
            error: false,
            success: true,
            totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getEventDetails(request, response) {
    try {
        const { eventId } = request.body

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const event = await EventsModel.findOne({
            _id: eventId,
            verified: true,
            dateofevent: { $gte: today } // Show only future events
        })

        return response.json({
            message: "Event details",
            data: event,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function searchEvent(request, response) {
    try {
        let { search, page, limit } = request.body

        page = page || 1
        limit = limit || 10

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const query = search
            ? {
                $text: { $search: search },
                verified: true,
                dateofevent: { $gte: today } // Show only future events
            }
            : { 
                verified: true,
                dateofevent: { $gte: today }
            }

        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            EventsModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            EventsModel.countDocuments(query)
        ])

        return response.json({
            message: "Events data",
            error: false,
            success: true,
            data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page,
            limit
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
