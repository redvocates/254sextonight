import axios from "axios";
import moment from "moment";

export async function POST(req) {
    const { phone, amount } = await req.json(); // Get user input

    // Fetch M-Pesa Token
    const tokenRes = await fetch(`${process.env.CURRENT_URL}/api/mpesa/token`);
    const { access_token } = await tokenRes.json();

    // Generate password
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: shortcode,
                PhoneNumber: phone,
                CallBackURL: process.env.MPESA_CALLBACK_URL,
                AccountReference: "Order123",
                TransactionDesc: "Payment for Order123",
            },
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        return Response.json(response.data);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
