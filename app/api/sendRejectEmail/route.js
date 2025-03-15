import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { recipientEmail } = body;

        //TODO: make GDSC mail account, add its details into the environment variables
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });


        const mailMessage = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: "You Were Rejected",
            html: `
                <h1>You were rejected lol</h1>
                <p>No qr code</p>
             `
        };

        await transporter.sendMail(mailMessage);

        return new Response(JSON.stringify({ success: true, message: "Reject email sent successfully" }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}