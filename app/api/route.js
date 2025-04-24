import mongoose from "mongoose"
import ModelsModel from "@/models/models.model.js"
import sendEmail from './email/route.js'

export async function registerModelsController(request, response) {
    try {
        const {slug, fullname, username, phonenumber, idnumber, yearofbirth, email, gender, description, shot, sleepover, incalls, outcalls, anal, country, county, detailedlocation, imagedisplay, nationalproof, verified } = request.json()

        if (!slug || !fullname || !username || !phonenumber || !idnumber || !yearofbirth || !email || !gender || !description || !county || !shot || !sleepover || !incalls || !outcalls || !anal || !detailedlocation || !imagedisplay || !nationalproof) {
            return response.status(400).json({
                message: "Fill all required fields",
                error: true,
                success: false
            })
        }

        const model = await ModelsModel.findOne({ email })
        const model1 = await ModelsModel.findOne({ phonenumber })
        const model2 = await ModelsModel.findOne({ idnumber })

        if (model) {
            return response.json({
                message: "A user with that email already exists",
                error: true,
                success: false
            })
        }
        if (model1) {
            return response.json({
                message: "A user with that phone number already exists",
                error: true,
                success: false
            })
        }
        if (model2) {
            return response.json({
                message: "A user with that Passport / ID Number already exists",
                error: true,
                success: false
            })
        }

        const payload = { fullname, username, phonenumber, idnumber, yearofbirth, email, gender, description, shot, sleepover, incalls, outcalls, anal, country, county, detailedlocation, imagedisplay, nationalproof, verified }

        const newmodel = new ModelsModel(payload)
        await newmodel.save()

        await sendEmail({
            sendto: email,
            subject: `Thank you for joining us ${fullname}, await admin verification`,
            html: 'Welcome'
        })

        return response.json({
            message: "Model Creation Successful, Await Admin Verification",
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


export const getModelDetails = async (request, response) => {
    try {
        const { slug } = request.body

        const model = await ModelsModel.findOne({ slug: slug, verified: true }) // Ensuring only verified models are fetched

        return response.json({
            message: "Model details",
            data: model,
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

export const updateModelDetails = async (request, response) => {
    try {
        const { slug } = request.body

        if (!slug) {
            return response.status(400).json({
                message: "Provide Model slug",
                error: true,
                success: false
            })
        }

        const updateModel = await ModelsModel.updateOne({ slug: slug }, { ...request.body })

        return response.json({
            message: "Updated successfully",
            data: updateModel,
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

export const deleteModelDetails = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }

        const deleteModel = await ModelsModel.deleteOne({ _id: _id })

        return response.json({
            message: "Deleted successfully",
            error: false,
            success: true,
            data: deleteModel
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const searchModel = async (request, response) => {
    try {
        let { search, page, limit } = request.body

        const query = search ? {
            $text: { $search: search },
            verified: true // Ensuring only verified models are fetched
        } : { verified: true }


        const [data, dataCount] = await Promise.all([
            ModelsModel.find(query).sort({ createdAt: -1 }).populate('county detailedlocation'),
            ModelsModel.countDocuments(query)
        ])

        return response.json({
            message: "Models data",
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
