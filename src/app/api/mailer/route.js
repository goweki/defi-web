import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // request body
    const doc = await request.json();
    console.log(
      `POST REQUEST: to send an email. \n >> \n..........................`
    );
    // nodemailer transporter obj
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT_USERNAME,
        pass: process.env.GMAIL_ACCOUNT_PASS,
      },
    });
    // nodemailer options
    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT_FROM,
      to: process.env.GMAIL_ACCOUNT_TO,
      subject: doc.subject,
      text: doc.text,
    };
    console.log(`CHECKPOINT: Sending mail \n >> \n..........................`);
    // send email
    const result = await transporter.sendMail(
      mailOptions
      //     function (error, info) {
      //   console.log(`CHECKPOINT: 675765465 \n >> \n..........................`);
      //   if (error) {
      //     //if failed
      //     console.log("ERROR: failed to send email: " + error);
      //     return Response.json({ error: error });
      //   } else {
      //     // success
      //     console.log("SUCCESS: Email sent: " + info.response);
      //     return Response.json({ success: info.response });
      //   }
      // }
    );
    if (result.accepted.length > 0) return Response.json({ success: result });
    else return Response.json({ error: result });
  } catch (error) {
    // handle ERROR if caught
    console.log(
      `ERROR: error caught in mailer route -POST\n >> ${
        error.error || error
      }\n.........................`
    );
    return Response.json({ error: "Email was not sent" });
  }
}
