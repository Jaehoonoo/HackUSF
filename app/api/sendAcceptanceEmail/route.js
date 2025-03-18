import nodemailer from "nodemailer";
import sgMail from '@sendgrid/mail';

export async function POST(req) {
    try {
        const body = await req.json();
        const { recipientEmail, userId, firstName } = body;

        ///TODO: make GDSC mail account, add its details into the environment variables
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth:{
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS,
        //     }
        // });

        // // Generate QR code (must use await)
        // const qrCode = await QRCode.toDataURL(userId, {
        //     errorCorrectionLevel: 'H',
        //     width: 200,
        //     height: 200,
        //     margin: 1
        // });

        // // Convert base64 string to a Buffer
        // const qrCodeBuffer = Buffer.from(qrCode.split(",")[1], "base64");

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: recipientEmail, // Change to your recipient
            from: 'gdsc@hackusf.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

        //TODO: add formatted email
        // const mailMessage = {
        //     from: `"GDSC at USF" <${process.env.EMAIL_USER}>`,
        //     to: recipientEmail,
        //     subject: `Congratulations! - HackUSF Acceptance`,
        //     html: `
        //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        //             <h1 style="color: #4285F4; text-align: center;">You've been accepted to HackUSF, ${firstName}!</h1>
        //             <p style="font-size: 16px; line-height: 1.5;">
        //                 We're thrilled to have you join us for HackUSF 2025! Your application has been accepted, and we can't wait to see what you'll create.
        //             </p>
        //             <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        //                 <h2 style="color: #4285F4; margin-top: 0;">Event Details:</h2>
        //                 <p><strong>Date:</strong> [Event Date]</p>
        //                 <p><strong>Time:</strong> [Start Time] - [End Time]</p>
        //                 <p><strong>Location:</strong> [Venue Name and Address]</p>
        //             </div>
        //             <p>If you have any questions, please contact us at [contact email].</p>
        //             <p>Looking forward to seeing you there!</p>
        //             <p>Best,<br>The HackUSF Team</p>
        //             <p style="font-size: 12px; text-align: center;">
        //                 If you do not wish to receive emails, <a href="#">unsubscribe here</a>.
        //             </p>
        //         </div>
        //     `
        // }

        // await transporter.sendMail(mailMessage);

        return new Response(JSON.stringify({ success: true, message: "Acceptance email sent successfully" }), { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
    }
}
