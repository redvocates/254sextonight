import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(req) {
    try {
        const data = await req.json();
        console.log("M-Pesa Callback Response:", data);

        const callback = data?.Body?.stkCallback;
        if (!callback) {
            return NextResponse.json({ message: "Invalid Callback" }, { status: 400 });
        }

        // Extract transaction details
        const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callback;

        // Check if the transaction was successful
        if (ResultCode !== 0) {
            return NextResponse.json({ success: false, message: "Payment failed", ResultDesc });
        }

        // Extract important details
        let paymentDetails = {
            MerchantRequestID,
            CheckoutRequestID,
            status: "Success",
            amount: null,
            transactionCode: null,
            phoneNumber: null,
            transactionDate: null,
        };

        // Loop through the CallbackMetadata to get details
        CallbackMetadata?.Item.forEach((item) => {
            if (item.Name === "Amount") paymentDetails.amount = item.Value;
            if (item.Name === "MpesaReceiptNumber") paymentDetails.transactionCode = item.Value;
            if (item.Name === "TransactionDate") paymentDetails.transactionDate = item.Value;
            if (item.Name === "PhoneNumber") paymentDetails.phoneNumber = item.Value;
        });

        // Save payment details (for testing, we save to a file)
        fs.writeFileSync("mpesa-payments.json", JSON.stringify(paymentDetails, null, 2));

        return NextResponse.json({ success: true, paymentDetails });
    } catch (error) {
        console.error("Error handling M-Pesa callback:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
