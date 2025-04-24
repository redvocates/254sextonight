import { NextResponse } from "next/server";
import ModelsModel from "@/models/models.model";
import ClientsModel from "@/models/clients.model";
import { connectDB } from "@/utils/connectDB";
import axios from "axios";


export async function GET(req, { params }) {
    await connectDB(); 

    const { slug } = await params;
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId"); // Extract clientId from query
    // Fetch model details WITHOUT phone and email
    const model = await ModelsModel.findOne({ slug }).select("country _id username location scrapped detailedLocation imagedisplay description incalls outcalls anal fine gender verified slug videos services");

    if (!model) {
        console.log('Error'); 
        return NextResponse.json({ status: "error", message: "Model not found" }, { status: 404 });
       
    }
    console.log(model);

        // If clientId exists, check if they paid successfully
        if (clientId) {
            const client = await ClientsModel.findById(clientId);
    
            if (client && client.successfull) {
                // Fetch model details with private data
                model = await ModelsModel.findOne({ slug }).select("-fullname -idnumber -nationalproof");
            }
        }


    return NextResponse.json({ status: "success", model });
    
}

export async function POST(req, { params }) {
    await connectDB();
    const { slug } = await params;

    const {
        fullname,
        location,
        phonenumber,
        email,
    } = await req.json();

    const model = await ModelsModel.findOne({ slug });

    if (!model) {
        return NextResponse.json({ status: "error", message: "Model not found" }, { status: 404 });
    }

    // Save client with verified: false
    const client = await ClientsModel.create({
        fullname,
        location,
        phonenumber,
        price: 1000, // Fixed price
        email,
        loverid: model._id,
        lovername: model.username,
        lovercounty: model.county,
        loverlocation: model.detailedlocation,
        lovershot: model.shot,
        loversleepover: model.sleepover,
        loverage: model.yearofbirth,
        loverimage: model.imagedisplay,
        successfull: false,
    });
    console.log(client._id , 'Registered halfway');

    // Get M-Pesa Access Token
    const tokenRes = await fetch(`${process.env.CURRENT_URL}/api/mpesa/token`);
    const { access_token } = await tokenRes.json();

    // Generate Password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
    const callbackUrl = `${process.env.BASE_URL}/api/mpesa/client?clientId=${client._id}`;

    // STK Push Request (Ksh 1000) 
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: 1000, // Client must pay 1000
                PartyA: phonenumber,
                PartyB: shortcode,  
                PhoneNumber: phonenumber,
                CallBackURL: callbackUrl, // ✅ Include client ID in callback  `${process.env.BASE_URL}/api/mpesa/client`,
                AccountReference: "client",
                TransactionDesc: "Client Access Payment",
            },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        return NextResponse.json({ status: "pending", message: "STK Push Sent", clientId: client._id });
    } catch (error) {
        await ClientsModel.findByIdAndDelete(client._id);
        return NextResponse.json({ status: "failed", message: "STK Push Failed" }, { status: 500 });
    }
}
