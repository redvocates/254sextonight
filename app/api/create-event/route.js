import axios from "axios";
import { connectDB } from '@/utils/connectDB';
import EventsModel from "@/models/events.model";


export async function POST(req) {
  const {
    fullname,
    username,
    idnumber,
    entry,
    dateofevent,
    bookinglink, 
    fine, 
    location,
    phonenumber,
    banner,
    email,
    description,
    verified,
    nationalproof,
    packing,
    slug
  } = req.json();
    await connectDB();

    // Save Model with verified: false
    const model = await EventsModel.create({ fullname,
      fullname,
    username,
    idnumber,
    entry,
    dateofevent,
    bookinglink, 
    fine, 
    location,
    phonenumber,
    banner,
    email,
    description,
    nationalproof,
    packing,
      slug, verified: false });

    // M-Pesa Payment Request
    const tokenRes = await fetch(`${process.env.CURRENT_URL}/api/mpesa/token`);
    const { access_token } = await tokenRes.json();
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: 1000, 
                PartyA: phonenumber,
                PartyB: shortcode,
                PhoneNumber: phonenumber,
                CallBackURL: `${process.env.CURRENT_URL}/api/mpesa/callback/events`,
                AccountReference: "event",
                TransactionDesc: "Event Creation Payment",
            },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        return Response.json({ status: "pending", message: "STK Push Sent", modelId: model._id });
    } catch (error) {
        await EventsModel.findByIdAndDelete(model._id);
        return Response.json({ status: "failed", message: "STK Push Failed" }, { status: 500 });
    }
}

