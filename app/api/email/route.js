import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // True for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async ({ fullname, sendto, subject, html }) => {
    try {
        const mailOptions = {
            from: `"254SexTonight" <${process.env.SMTP_USER}>`,
            to: sendto,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);
        return info;
    } catch (error) {
        console.error("Email sending error: ", error);
        throw error;
    }
};

export default sendEmail;
