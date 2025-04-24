import mongoose from "mongoose"
import MassageModel from '@/models/massage.model.js'

// Register Massage
export async function registerMassageController(request, response) {
    try {
        const { fullname, businesstype, location, phonenumber, banner, price, email, packing, description, verified } = request.body

        if (!fullname || !businesstype || !location || !banner || !phonenumber || !price || !packing || !description) {
            return response.status(400).json({
                message: "Fill all required fields",
                error: true,
                success: false
            })
        }

        const payload = { fullname, businesstype, location, phonenumber, banner, price, email, packing, description, verified: verified || false }

        const newmassagist = new MassageModel(payload)
        await newmassagist.save()

/**        if (email) {
            await sendEmail({
                sendto: email,
                subject: `Masseuse Created Successfully ${fullname}, await admin verification`,
                html: welcomeEmail({ fullname })
            })
        }*/

        return response.json({
            message: "Masseuse Creation Successful, Await Admin Verification",
            success: true,
            error: false
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Get all massages (only verified)
export async function getMassagesController(request, response) {
    try {
        let { page = 1, limit = 10, search } = request.body

        const query = search
            ? { $text: { $search: search }, verified: true }
            : { verified: true }

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            MassageModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            MassageModel.countDocuments(query)
        ])

        return response.json({
            message: "Massage data",
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

// Get massage details (only verified)
export async function getMassageDetails(request, response) {
    try {
        const { massageId } = request.body

        if (!massageId) {
            return response.status(400).json({
                message: "Provide a valid massage ID",
                error: true,
                success: false
            })
        }

        const massage = await MassageModel.findOne({ _id: massageId, verified: true })

        if (!massage) {
            return response.status(404).json({
                message: "Massage not found or not verified",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Massage details",
            data: massage,
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

// Update massage details
export async function updateMassageDetails(request, response) {
    try {
        const { _id, ...updateFields } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide massage _id",
                error: true,
                success: false
            })
        }

        const updatedMassage = await MassageModel.findByIdAndUpdate(_id, updateFields, { new: true })

        if (!updatedMassage) {
            return response.status(404).json({
                message: "Massage not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Updated successfully",
            data: updatedMassage,
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

// Delete massage
export async function deleteMassageDetails(request, response) {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }

        const deletedMassage = await MassageModel.findByIdAndDelete(_id)

        if (!deletedMassage) {
            return response.status(404).json({
                message: "Massage not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Deleted successfully",
            error: false,
            success: true,
            data: deletedMassage
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Search massages (only verified)
export async function searchMassage(request, response) {
    try {
        let { search, page = 1, limit = 10 } = request.body

        const query = search
            ? { $text: { $search: search }, verified: true }
            : { verified: true }

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            MassageModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('county detailedlocation'),
            MassageModel.countDocuments(query)
        ])

        return response.json({
            message: "Massage data",
            error: false,
            success: true,
            data,
            totalCount,
            totalPage: Math.ceil(totalCount / limit),
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
