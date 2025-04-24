import ClientsModel from "@/models/clients.model";
import { connectDB } from "@/utils/connectDB";


export async function POST(req) {
    const data = await req.json();
    console.log("Client M-Pesa Callback:", JSON.stringify(data, null, 2));

    await connectDB();

    if (data.Body.stkCallback.ResultCode === 0) {
        const callbackData = data.Body.stkCallback.CallbackMetadata;
        const transactionCode = callbackData.Item.find(item => item.Name === "MpesaReceiptNumber")?.Value;
        const phone = callbackData.Item.find(item => item.Name === "PhoneNumber")?.Value;

        // Update client as verified
        await ClientsModel.findOneAndUpdate({ phonenumber: phone }, { verified: true, transactionCode });

        return Response.json({ status: "success", transactionCode });
    } else {
        await ClientsModel.findOneAndDelete({ phonenumber: phone });
        return Response.json({ status: "failed", message: "Payment Failed" });
    }
}
 