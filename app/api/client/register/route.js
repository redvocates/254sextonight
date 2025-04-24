import ClientsModel from "@/models/clients.model";
import { connectDB } from "@/utils/connectDB";
import axios from "axios";

export async function POST(req) {
    const {
        clientName,
        clientPhone,
        clientEmail,
        loverid,
        lovername,
        lovercounty,
        loverlocation,
        lovershot,
        loversleepover,
        loverage,
        loverimage
    } = await req.json();

    await connectDB();

    // Save client with verified: false
    const client = await ClientsModel.create({
        fullname:clientName,
        location:'NILL',
        phonenumber: clientPhone,
        price: 1000, // Fixed price
        email: clientEmail,
        loverid,
        lovername,
        lovercounty,
        loverlocation,
        lovershot,
        loversleepover,
        loverage,
        loverimage,
        successfull: false,
    });

    // Get M-Pesa Access Token
    const tokenRes = await fetch(`${process.env.CURRENT_URL}/api/mpesa/token`);
    const { access_token } = await tokenRes.json();

    // Generate Password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

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
                PartyA: clientPhone,
                PartyB: shortcode, 
                PhoneNumber: clientPhone,
                CallBackURL: `${process.env.CURRENT_URL}/api/mpesa/client`,
                AccountReference: "client",
                TransactionDesc: "Client Access Payment",
            },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        return Response.json({ status: "pending", message: "STK Push Sent", clientId: client._id });
    } catch (error) {
        await ClientsModel.findByIdAndDelete(client._id);
        return Response.json({ status: "failed", message: "STK Push Failed" }, { status: 500 });
    }
}
