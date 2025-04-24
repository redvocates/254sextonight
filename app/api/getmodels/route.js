// app/api/getmodels/route.js
import ModelsModel from "@/models/models.model";
import { connectDB } from "@/utils/connectDB";

// Export the GET method for the API route
export async function GET(request) {
    try {
        let { search, gender } = request.nextUrl.searchParams;  // Get query parameters

        // Building query filter for search and gender
        const query = {
            verified: true,  // Ensuring only verified models are fetched
        };

        if (search) query.$text = { $search: search };  // Handle search
        if (gender) query.gender = gender;  // Handle gender filter
       await  connectDB()
        // Fetching data from the database
        const data = await ModelsModel.find(query).sort({ createdAt: -1 }).select("-phonenumber -email -fullname -idnumber -nationalproof -extra_images -'Profile Link'").then(models => models.sort(() => Math.random() - 0.5));
        const totalCount = data.length;  // Get total count from the fetched 

        return new Response(
            JSON.stringify({
                message: "Models data",
                error: false,
                success: true,
                totalCount,
                data,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: error.message || error,
                error: true,
                success: false,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
