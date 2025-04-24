import axios from "axios";
import { connectDB } from '@/utils/connectDB';
import MassageModel from "@/models/massage.model";


export async function POST(req) {
  const {
    fullname,
    username,
    idnumber,
    fine,
    businesstype,
    location,
    phonenumber,
    banner,
    email,
    description,
    nationalproof,
    packing,
    slug
  } = req.json();
    await connectDB();

    // Save Model with verified: false
    const model = await MassageModel.create({ fullname,
      fullname,
    username,
    idnumber,
    fine,
    businesstype,
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
                Amount: 500, 
                PartyA: phone,
                PartyB: shortcode,
                PhoneNumber: phonenumber,
                CallBackURL: `${process.env.CURRENT_URL}/api/mpesa/callback/masseuse`,
                AccountReference: "escort",
                TransactionDesc: "Escort Registration Payment",
            },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        return Response.json({ status: "pending", message: "STK Push Sent", modelId: model._id });
    } catch (error) {
        await MassageModel.findByIdAndDelete(model._id);
        return Response.json({ status: "failed", message: "STK Push Failed" }, { status: 500 });
    }
}

