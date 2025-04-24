import axios from "axios";
import { connectDB } from '@/utils/connectDB';
import ModelsModel from "@/models/models.model";

export async function POST(req) {
  const data = await req.json();

    const {
      fullname,
      username,
      phonenumber,
      idnumber,
      yearofbirth,
      email,
      gender,
      description,
      shot,
      fine,
      sleepover,
      incalls,
      outcalls,
      anal,
      country,
      county,
      detailedlocation,
      imagedisplay,
      nationalproof,
      slug
    } = data;

    console.log(fullname);

    const requiredFields = [
      { field: 'fullname', message: 'Full Name is required' },
      { field: 'username', message: 'Pseudonym is required' },
      { field: 'phonenumber', message: 'Contact Number is required' },
      { field: 'idnumber', message: 'National ID Number or Passport Number is required' },
      { field: 'yearofbirth', message: 'Year of Birth is required' },
      { field: 'email', message: 'Contact Email Address is required' },
      { field: 'gender', message: 'Gender is required' },
      { field: 'description', message: 'Description is required' },
      { field: 'shot', message: 'Price per Shot is required' },
      { field: 'fine', message: 'Pricing is required' },
      { field: 'sleepover', message: 'Price per Sleepover is required' },
      { field: 'county', message: 'County is required' },
      { field: 'detailedlocation', message: 'Detailed description of your location is required' },
      { field: 'imagedisplay', message: 'Image Display is required' },
      { field: 'nationalproof', message: 'National Proof (e.g., ID or Passport picture) is required' },
      { field: 'slug', message: 'Slug is required' }
    ];

    // Check required fields
    for (const { field, message } of requiredFields) {
      if (!data[field] && data[field] !== 0) {
        console.log(`${field} is missing`);
        return new Response(JSON.stringify({ status: 'failed', message }), { status: 400 });
      }
    }


    const existingEmail = await ModelsModel.findOne({ email });
    const existingId = await ModelsModel.findOne({ idnumber });
    const existingPhone = await ModelsModel.findOne({ phonenumber });

    if (existingEmail) {
      return new Response(JSON.stringify({
        status: 'failed',
        message: 'Email exists in the database'
      }), { status: 400 });
    }
    if (existingId) {
      return new Response(JSON.stringify({
        status: 'failed',
        message: 'National Proof in the database'
      }), { status: 400 });
    }
    if (existingPhone) {
      if (existingPhone.scrapped) {
        // If `scrapped` is true, delete the old entry and allow the user to proceed
        await ModelsModel.deleteOne({ _id: existingPhone._id });
      } else {
        return new Response(JSON.stringify({
          status: 'failed',
          message: 'Phone number already exists in the database'
        }), { status: 400 });
      }
    }
  await connectDB();

  console.log('Save Model with verified: false');
  const model = await ModelsModel.create({
    fullname,
    username,
    phonenumber,
    idnumber,
    yearofbirth,
    email,
    gender,
    description,
    shot,
    fine,
    sleepover,
    incalls,
    outcalls,
    anal,
    country,
    county,
    detailedlocation,
    imagedisplay,
    nationalproof,
    scrapped: false,
    slug,
    verified: false
  });


  console.log('M-Pesa Payment Request');
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
        PartyA: phonenumber, // Updated here
        PartyB: shortcode,
        PhoneNumber: phonenumber,
        CallBackURL: `${process.env.CURRENT_URL}/api/mpesa/callback/escorts`,
        AccountReference: "escort",
        TransactionDesc: "Escort Registration Payment",
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    return new Response(
      JSON.stringify({ status: "pending", message: "STK Push Sent", modelId: model._id }),
      { status: 200 }
    );
  } catch (error) {
    console.log('Deleting Escort...');
    await ModelsModel.findByIdAndDelete(model._id);
    return new Response(
      JSON.stringify({ status: "failed", message: "STK Push Failed" }),
      { status: 500 }
    );
  }
}
















/**import axios from "axios";
import { connectDB } from '@/utils/connectDB';
import ModelsModel from "@/models/models.model";


export async function POST(req) {
  const {
    fullname,
    username,
    phonenumber,
    idnumber,
    yearofbirth,
    email,
    gender, 
    description,
    shot,
    fine,
    sleepover,
    incalls,
    outcalls,
    anal,
    country,
    county,
    detailedlocation,
    imagedisplay,
    nationalproof,
    slug
  } = req.body || await req.json();
   

  const requiredFields = [
    { field: 'fullname', message: 'Full Name is required' },
    { field: 'username', message: 'Pseudonym is required' },
    { field: 'phonenumber', message: 'Contact Number is required' },
    { field: 'idnumber', message: 'National ID Number or Passport Number is required' },
    { field: 'yearofbirth', message: 'Year of Birth is required' },
    { field: 'email', message: 'Contact Email Address is required' },
    { field: 'gender', message: 'Gender is required' },
    { field: 'description', message: 'Description is required' },
    { field: 'shot', message: 'Price per Shot is required' },
    { field: 'fine', message: 'Pricing is required' },
    { field: 'sleepover', message: 'Price per Sleepover is required' },
    { field: 'county', message: 'County is required' },
    { field: 'detailedlocation', message: 'Detailed description of your location is required' },
    { field: 'imagedisplay', message: 'Image Display is required' },
    { field: 'nationalproof', message: 'National Proof (e.g., ID or Passport picture) is required' },
    { field: 'slug', message: 'Slug is required' },
  ];
  
  for (const { field, message } of requiredFields) {
    if (!req.body[field]) {
      return Response.json({ status: 'failed', message: message }, { status: 400 });
    }
  }
  
  // Continue with the rest of your logic if all fields are present
  
    await connectDB();
    // Save Model with verified: false
    const model = await ModelsModel.create({ fullname,
      username,
      phonenumber,
      idnumber,
      yearofbirth,
      email,
      gender,
      description,
      shot,
      fine,
      sleepover,
      incalls,
      outcalls,
      anal,
      country,
      county,
      detailedlocation,
      imagedisplay,
      nationalproof,
      scrapped:false,
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
                PartyA: phonenumber,
                PartyB: shortcode,
                PhoneNumber: phonenumber,
                CallBackURL: `${process.env.CURRENT_URL}/api/mpesa/callback/escorts`,
                AccountReference: "escort",
                TransactionDesc: "Escort Registration Payment",
            },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        return Response.json({ status: "pending", message: "STK Push Sent", modelId: model._id });
    } catch (error) {
        await ModelsModel.findByIdAndDelete(model._id);
        return Response.json({ status: "failed", message: "STK Push Failed" }, { status: 500 });
    }
}

 */