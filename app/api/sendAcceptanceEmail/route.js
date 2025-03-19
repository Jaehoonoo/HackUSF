import sgMail from '@sendgrid/mail';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(req) {
    try {
        const body = await req.json();
        const { recipientEmail, firstName, userId } = body;

        // Update user status in Firebase using v9 syntax
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            status: 'accepted'
        });

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: recipientEmail, // Change to your recipient
            from: 'gdsc@hackusf.com', // Change to your verified sender
            subject: 'Congratulations! - HackUSF Acceptance',
            text: `Congratulations! You\'ve been accepted to HackUSF 2025! We\'re thrilled to welcome you to our first-ever Hackathon this coming April 5th & 6th. Get ready for an exciting couple of days filled with creativity, technology, and fun!`,
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
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h2 style="text-align: center">Congratulations, ${firstName || 'Hacker'}! You've been accepted to HackUSF 2025!&nbsp;</h2><div></div></div></td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f621c098-26d2-4e3d-b510-21e455f97994" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">We're thrilled to welcome you to our first-ever Hackathon this coming April 5th &amp; 6th. Get ready for an exciting couple of days filled with creativity, technology, and fun!</span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table>
                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="important-id-section" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:center;" height="100%" valign="top" bgcolor="" role="module-content">
                            <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="font-size: 18px"><strong>IMPORTANT!</strong></span><br>
                                    <span style="font-size: 18px">Your Hacker ID is located in your profile and will be used for Check-In and to get food.</span>
                                </div>
                                <div></div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="16615481-57ce-452b-a29c-f454d016b9d9" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:16px 0px 16px 0px; line-height:23px; text-align:center;" height="100%" valign="top" bgcolor="" role="module-content"><div><h3 style="text-align: inherit">Next Steps:</h3><div></div></div></td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b16deea6-2de4-42ea-9c9c-40150ac3299c" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">1.⁠</span><span style="font-size: 18px; color: #c3352b"> ⁠Secure Your Spot </span><span style="font-size: 18px">- (Don't Forget to RSVP - </span><span style="font-size: 18px; color: #c3352b">Required by March 30th</span><span style="font-size: 18px">)<br>
                Great news—you made it! Now, let's make it official. Simply click the link below, log into your HackUSF account, and confirm your spot. We're counting on your unique talents to make this event a success!</span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="b819baff-f0c8-499c-8107-a72d2652cacc">
                    <tbody>
                        <tr>
                        <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                            <tbody>
                                <tr>
                                <td align="center" bgcolor="#FF6B6B" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                <a href="https://hackusf.com/profile" style="background-color:#FF6B6B; border:3px solid #000000; border-color:#000000; border-radius:12px; border-width:3px; color:#000000; display:inline-block; font-size:14px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">HackUSF Profile</a>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="cd3ffce9-0dfa-44a7-a8d1-e2fbff769148">
                    <tbody>
                    <tr>
                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                        </td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="319d2050-a031-4ac7-bbbe-453481ea182b" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">2.⁠ ⁠</span><span style="font-size: 18px; color: #5262bc">Join Our Community on Discord</span><span style="font-size: 18px"><br>
                Dive into the heart of HackUSF! Join our Discord to meet other talented hackers, interact with our mentors, and stay updated with real-time announcements.</span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="bfbe5e3b-d6d5-482a-8784-ed6dd0d7bc96">
                    <tbody>
                        <tr>
                        <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                            <tbody>
                                <tr>
                                <td align="center" bgcolor="#6f7cc0" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                <a href="https://discord.gg/Zdx4Hkt33W" style="background-color:#6f7cc0; border:3px solid #000000; border-color:#000000; border-radius:12px; border-width:3px; color:#000000; display:inline-block; font-size:14px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">GDSC Discord Server</a>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="285089ea-1d0c-43b2-a8a2-bf7210ad3406">
                    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="share-excitement-text" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">3.⁠ ⁠</span><span style="font-size: 18px; color: #5262bc">Share Your Excitement</span><span style="font-size: 18px"><br>
                        Let the world know you're heading to HackUSF 2025! Share your acceptance on your favorite social media platforms using the design made just for you - our talented hackers. It's a fantastic way to connect with other participants and even catch the attention of future employers.</span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table>
                <table class="module" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="acceptance-graphic-button">
                <tbody>
                <tr>
                    <td style="font-size:6px; line-height:10px; padding:10px 0px 10px 0px;" valign="top" align="center">
                        <a href="https://drive.google.com/file/d/1dfDJEOsO3ApbYZKy624DHbq4aizgqimM/view?usp=drive_link" target="_blank">
                            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:80% !important; width:80%; height:auto !important; border:3px solid #000000; border-radius:12px;" width="480" alt="HackUSF Acceptance Graphic" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/89ff31a5b6764e83/f9089594-cf64-4d51-a367-e1c21012d312/1080x1080.jpg">
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="graphic-caption" data-mc-module-version="2019-10-22">
                <tbody>
                <tr>
                    <td style="padding:10px 0px 10px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                        <div>
                            <div style="font-family: inherit; text-align: center">
                                <span style="font-size: 14px; color: #5c5c5c"><em>Click the image to download your acceptance graphic</em></span>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
                <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="share-excitement-spacer">
                    <tbody>
                    <tr>
                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                        </td>
                    </tr>
                    </tbody>
                </table>
                    <tbody>
                    <tr>
                        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                        </td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d955e4fb-1f5b-4a76-8258-dfd82c2c221a" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #5c5c5c"><em>Have Any Questions? We're here to help! Don't hesitate to reach out to us at gdscatusf@gmail.com</em></span></div><div></div></div></td>
                    </tr>
                    </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8c035866-19b6-4095-b6f5-b75a407e8958" data-mc-module-version="2019-10-22">
                    <tbody>
                    <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 14px; color: #5c5c5c"><strong>With 🖤, GDSC Team</strong></span></div><div></div></div></td>
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

        return new Response(JSON.stringify({ success: true, message: "Acceptance email sent and status changed successfully" }), { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
    }
}
