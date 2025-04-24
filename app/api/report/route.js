import { connectDB } from "@/utils/connectDB";
import reportModel from "@/models/report.model.js";
//import nodemailer from "nodemailer";
import { Resend } from "resend";


export async function POST(req) {
  try {
    await connectDB(); // Connect to the database
    const {name, email, phone, location, reportType, issueType, description} = await req.json();
    const report = await reportModel.create({name, email, phone, location, reportType, issueType, description}); // Create the report
    console.log(report);




//emails
const resend = new Resend(process.env.RESEND_API);

// Send email to the user
await resend.emails.send({
  from: "254Sextonight noreply@onresend.com",  // Must be a verified domain in Resend
  to: email,
  subject: "Report Received - 254Sextonight",
  text: `Dear ${name},\n\nWe have received your report. We will review it and take necessary action.\n\nThank you!\n\n- 254Sextonight Team`,
});

 // Send email to admin
 await resend.emails.send({
  from: "254Sextonight noreply@onresend.com",
  to: process.env.ADMIN_EMAIL,
  subject: "New Report Submitted",
  text: `A new report has been submitted:\n\n${email}`,
});

    // Respond with success message
    return new Response(
      JSON.stringify({ message: "Report submitted successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting report:", error);

    // Handle any errors during the process
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}




/*   // Email settings

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.com", // Yandex SMTP server
  port: 465, // Secure SMTP port (use 587 for TLS)
  secure: true, // `true` for port 465, `false` for 587
  auth: {
    user: process.env.SMTP_USER, // Your Yandex email
    pass: process.env.SMTP_PASS, // Yandex app password
  },
});

const mailOptions = {
  from: process.env.SMTP_PASS, // Must match the authenticated email
  to: email,
  subject: "Report Received - 254Sextonight",
  text: `Dear ${name},\n\nWe have received your report. We will review it and take necessary action.\n\nThank you!\n\n- 254Sextonight Team`,
};

const adminMailOptions = {
  from: process.env.SMTP_USER,
  to: process.env.ADMIN_EMAIL,
  subject: "New Report Submitted",
  text: `A new report has been submitted:\n\n${JSON.stringify(req.body, null, 2)}`,
};
  await transporter.sendMail(mailOptions);
  await transporter.sendMail(adminMailOptions);
  console.log("✅ Emails sent successfully!");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Report Received - 254Sextonight",
      text: `Dear ${req.body.name},\n\nWe have received your report. We will review it and take necessary action.\n\nThank you!\n\n- 254Sextonight Team`,
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Report Submitted",
      text: `A new report has been submitted:\n\n${JSON.stringify(req.body, null, 2)}`,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminMailOptions);
*/