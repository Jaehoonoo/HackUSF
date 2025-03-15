import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { recipientEmail, qrCode, userName } = body;

        ///TODO: make GDSC mail account, add its details into the environment variables
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });


        const qrCodeBuffer = Buffer.from(
            qrCode.replace(/^data:image\/png;base64,/, ''),
            "base64"
        );

        //TODO: add formatted email
        const mailMessage = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: "You Were Accepted",
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
