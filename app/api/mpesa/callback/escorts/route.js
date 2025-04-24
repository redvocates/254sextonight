import ModelsModel from "@/models/models.model";
import { connectDB } from "@/utils/connectDB";
//import { NextResponse } from "next/server";


export async function POST(req) {
    const data = await req.json();
    console.log("Model M-Pesa Callback:", JSON.stringify(data, null, 2));
    //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    //const url = new URL(req.url);

    await connectDB

    if (data.Body.stkCallback.ResultCode === 0) {
        const callbackData = data.Body.stkCallback.CallbackMetadata;
        const transactionCode = callbackData.Item.find(item => item.Name === "MpesaReceiptNumber")?.Value;
        const phone = callbackData.Item.find(item => item.Name === "PhoneNumber")?.Value;

        // Update model as verified
        await ModelsModel.findOneAndUpdate({ phone }, { verified: true, transactionCode });

        return Response.json({ status: "success", transactionCode });
        //return NextResponse.redirect(new URL(status === "COMPLETED" ? "/success" : "/failed", baseUrl));
    } else {
        await ModelsModel.findOneAndDelete({ phone });
        return Response.json({ status: "failed", message: "Payment Failed" });
    }
}
