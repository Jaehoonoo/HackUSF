import nodemailer from "nodemailer";
import QRCode from "qrcode";

export async function POST(req) {
    try {
        const body = await req.json();
        const { recipientEmail, userId } = body;

        ///TODO: make GDSC mail account, add its details into the environment variables
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        // Generate QR code (must use await)
        const qrCode = await QRCode.toDataURL(userId, {
            errorCorrectionLevel: 'H',
            width: 200,
            height: 200,
            margin: 1
        });

        // Convert base64 string to a Buffer
        const qrCodeBuffer = Buffer.from(qrCode.split(",")[1], "base64");

        //TODO: add formatted email
        const mailMessage = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: "Congratulations! You're in HackUSF 2025!",
            html: `
                <h1>Your QR Code</h1>
                <img src="cid:qrcode" alt="QR Code" />
                <p>Scan this code to access your information.</p>
             `,
            attachments: [{
                filename: "qrcode.png",
                content: qrCodeBuffer,
                cid: "qrcode"
            }]
        }

        await transporter.sendMail(mailMessage);

        return new Response(JSON.stringify({ success: true, message: "Acceptance email sent successfully" }), { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
    }
}
