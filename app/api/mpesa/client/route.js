import ClientsModel from "@/models/clients.model";
import ModelsModel from "@/models/models.model";
import { connectDB } from "@/utils/connectDB";

export async function POST(req) {
    const data = await req.json();
    console.log("Client M-Pesa Callback:", JSON.stringify(data, null, 2));

    const { searchParams } = new URL(req.url);
const clientId = searchParams.get("clientId");


    await connectDB();
 
    if (data.Body.stkCallback.ResultCode === 0) {
        const callbackData = data.Body.stkCallback.CallbackMetadata;
        const transactionCode = callbackData?.Item.find(item => item.Name === "MpesaReceiptNumber")?.Value || "N/A";
        const phone = callbackData?.Item.find(item => item.Name === "PhoneNumber")?.Value || "N/A";

        // Fetch the most recent pending transaction for this phone number
        const client = await ClientsModel.findByIdAndUpdate(
            clientId,
            { successfull: true, transactionCode },
            { new: true }
        );
        

        if (!client) {
            return Response.json({ status: "error", message: "Client transaction not found" }, { status: 404 });
        }

        // Fetch the exact model requested
        const model = await ModelsModel.findById(client.loverid);

  /**      if (!model) {
            console.error(`Model with ID ${client.loverid} not found for client ${client.fullname}`);
            await resend.emails.send({
                from: "support@yourdomain.com",
                to: "admin@yourdomain.com",
                subject: "Model Not Found After Payment",
                text: `A user (${client.fullname}, ${client.phonenumber}) completed payment, but the model ID ${client.loverid} was not found.`,
            });

            return Response.json({ status: "error", message: "Model not found, support has been notified" });
        }

        // Send email with model details
        await resend.emails.send({
            from: "yourcompany@yourdomain.com",
            to: client.email, // Use the email from the transaction
            subject: "Your Model's Contact Details",
            text: `
                Hello ${client.fullname},

                Your payment was successful! Here are the details of the model you selected:

                Name: ${model.username}
                Contact Number: ${model.phonenumber}
                Email: ${model.email}
                Location: ${model.detailedlocation}, ${model.county}, ${model.country}

                Enjoy your experience, and thank you for using our platform!

                Best regards, 
                Your Company Team
            `,
        });
*/
        return Response.json({ status: "success", transactionCode, model });
    } else {
        // Handle failed payment without deleting the transaction
        const phone = data.Body.stkCallback.CallbackMetadata?.Item.find(item => item.Name === "PhoneNumber")?.Value || "N/A";

        await ClientsModel.findByIdAndUpdate(clientId, {
            successfull: false,
            transactionCode: "FAILED",
        });
        

        return Response.json({ status: "failed", message: "Payment Failed" });
    }
}








/**
import ClientsModel from "@/models/clients.model";
import ModelsModel from "@/models/models.model";
import { connectDB } from "@/utils/connectDB";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const data = await req.json();
    console.log("Client M-Pesa Callback:", JSON.stringify(data, null, 2));

    await connectDB();

    if (data.Body.stkCallback.ResultCode === 0) {
        const callbackData = data.Body.stkCallback.CallbackMetadata;
        const transactionCode = callbackData.Item.find(item => item.Name === "MpesaReceiptNumber")?.Value;
        const phone = callbackData.Item.find(item => item.Name === "PhoneNumber")?.Value;

        // Update client as verified
        const client = await ClientsModel.findOneAndUpdate(
            { phonenumber: phone },
            { successfull: true, transactionCode },
            { new: true }
        );

        if (!client) {
            return Response.json({ status: "error", message: "Client not found" }, { status: 404 });
        }

        // Fetch full model details
        const model = await ModelsModel.findById(client.loverid);

        if (!model) {
            return Response.json({ status: "error", message: "Model not found" }, { status: 404 });
        }

        // Send email with model details
        await resend.emails.send({
            from: "yourcompany@yourdomain.com",
            to: client.email,
            subject: "Your Model's Contact Details",
            text: `
                Hello ${client.fullname},

                Your payment was successful! Here are the details of the model you selected:

                Name: ${model.username}
                Contact Number: ${model.phonenumber}
                Email: ${model.email}
                Location: ${model.detailedlocation}, ${model.county}, ${model.country}

                Enjoy your experience, and thank you for using our platform!

                Best regards, 
                Your Company Team
            `,
        });

        return Response.json({ status: "success", transactionCode, model });
    } else {
        await ClientsModel.findOneAndDelete({ phonenumber: phone });
        return Response.json({ status: "failed", message: "Payment Failed" });
    }
}
*/
