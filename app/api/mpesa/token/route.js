import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_MPESA_BASE_URL;

    if (!consumerKey || !consumerSecret || !baseUrl) {
        console.error("🚨 Missing MPESA environment variables!");
        return NextResponse.json({ error: "MPESA credentials missing" }, { status: 500 });
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    
    console.log("🔵 Using Base URL:", baseUrl);
    console.log("🟢 Encoded Auth:", auth);

    try {
        console.log("🔥 Fetching M-Pesa Token...");

        const response = await axios.get(
            `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        console.log("✅ M-Pesa Token Response:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("❌ ERROR fetching M-Pesa token:", error?.response?.data || error.message);
        return NextResponse.json({ error: error?.response?.data || error.message }, { status: 500 });
    }
}















/**



import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_MPESA_BASE_URL;

    if (!consumerKey || !consumerSecret || !baseUrl) {
        console.error("🚨 Missing MPESA environment variables!");
        return NextResponse.json({ error: "MPESA credentials missing" }, { status: 500 });
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        console.log("🔥 Fetching M-Pesa Token...");

        const response = await axios.get(
            `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        console.log("✅ M-Pesa Token Response:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("❌ ERROR fetching M-Pesa token:", error?.response?.data || error.message);
        return NextResponse.json({ error: error?.response?.data || error.message }, { status: 500 });
    }
}





import axios from "axios";

export async function GET() {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
            { headers: { Authorization: `Basic ${auth}` } }
        );
 
        return Response.json(response.data);
    } catch (error) { 
        console.log('Error Ocurred fetching token,', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
 */