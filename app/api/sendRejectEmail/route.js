import sgMail from '@sendgrid/mail';
import {db} from '@/firebase';
import {doc, updateDoc} from 'firebase/firestore';

export async function POST(req) {
    try {
        const body = await req.json();
        const {recipientEmail, firstName, userId} = body;

        // Update user status in Firebase using v9 syntax
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            status: 'rejected'
        });

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: recipientEmail, // Change to your recipient
            from: 'gdsc@hackusf.com', // Change to your verified sender
            subject: 'HackUSF 2025 Status Update',
            text: `Sorry, you\'ve been rejected from HackUSF 2025`,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                    <style type="text/css">
                    body, p, div {
                    font-family: arial,helvetica,sans-serif;
                    font-size: 14px;
                    }
                    body {
                    color: #000000;
                    }
                    body a {
                    color: #1188E6;
                    text-decoration: none;
                    }
                    p { margin: 0; padding: 0; }
                    table.wrapper {
                    width:100% !important;
                    table-layout: fixed;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: 100%;
                    -moz-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    }
                    img.max-width {
                    max-width: 100% !important;
                    }
                    .column.of-2 {
                    width: 50%;
                    }
                    .column.of-3 {
                    width: 33.333%;
                    }
                    .column.of-4 {
                    width: 25%;
                    }
                    ul ul ul ul  {
                    list-style-type: disc !important;
                    }
                    ol ol {
                    list-style-type: lower-roman !important;
                    }
                    ol ol ol {
                    list-style-type: lower-latin !important;
                    }
                    ol ol ol ol {
                    list-style-type: decimal !important;
                    }
                    @media screen and (max-width:480px) {
                    .preheader .rightColumnContent,
                    .footer .rightColumnContent {
                        text-align: left !important;
                    }
                    .preheader .rightColumnContent div,
                    .preheader .rightColumnContent span,
                    .footer .rightColumnContent div,
                    .footer .rightColumnContent span {
                        text-align: left !important;
                    }
                    .preheader .rightColumnContent,
                    .preheader .leftColumnContent {
                        font-size: 80% !important;
                        padding: 5px 0;
                    }
                    table.wrapper-mobile {
                        width: 100% !important;
                        table-layout: fixed;
                    }
                    img.max-width {
                        height: auto !important;
                        max-width: 100% !important;
                    }
                    a.bulletproof-button {
                        display: block !important;
                        width: auto !important;
                        font-size: 80%;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }
                    .columns {
                        width: 100% !important;
                    }
                    .column {
                        display: block !important;
                        width: 100% !important;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                    }
                    .social-icon-column {
                        display: inline-block !important;
                    }
                    }
                </style>
                    </head>
                    <body>
                    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                        <div class="webkit">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                            <tr>
                            <td valign="top" bgcolor="#FFFFFF" width="100%">
                                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td width="100%">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                        <td>
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                    <tr>
                                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                    <tr>
                    <td role="module-content">
                        <p></p>
                    </td>
                    </tr>
                </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="621a70bf-9221-4ebf-ad48-67254c78ad9d">
                    <tbody>
                    <tr>
                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                        <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/89ff31a5b6764e83/75b3cc2b-155b-4ede-9731-d7378c45baf6/960x748.png">
                        </td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0b3735ae-3904-4739-9556-63a29d081ca1" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h2 style="text-align: center">Sorry, ${firstName || 'Hacker'}. HackUSF 2025 Status Update</h2><div></div></div></td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f621c098-26d2-4e3d-b510-21e455f97994" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Thank you for applying for HackUSF 2025! We were impressed by your application but unfortunately cannot offer you a spot at this time.</span></div>
                <div style="font-family: inherit; text-align: center"><br></div>
                <div style="font-family: inherit; text-align: center"><span style="font-size: 18px">We appreciate your time and would encourage you to apply again next year.</span></div>
                <div style="font-family: inherit; text-align: center"><br></div>
                <div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Good luck and best wishes in your future endeavors.</span><span style="font-size: 18px"><br>
                <br>
                </span><span style="font-size: 18px">Best,</span><span style="font-size: 18px"><br>
                </span><span style="font-size: 18px">GDSC Team</span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table></td>
                                                    </tr>
                                                    </table>
                                        </td>
                                        </tr>
                                    </table>
                                    </td>
                                </tr>
                                </table>
                            </td>
                            </tr>
                        </table>
                        </div>
                    </center>
                    </body>
                </html>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        return new Response(JSON.stringify({
            success: true,
            message: "Reject email sent and status changed successfully"
        }), {status: 200});

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
    }
}
