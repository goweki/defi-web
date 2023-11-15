import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // request body
    const doc = await request.json();
    console.log(
      `POST REQUEST: to send an email. \n >> \n..........................`
    );
    // nodemailer transporter obj
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT_FROM,
        pass: process.env.GMAIL_ACCOUNT_PASS,
      },
    });
    // nodemailer options
    var mailOptions = {
      from: process.env.GMAIL_ACCOUNT_FROM,
      to: process.env.GMAIL_ACCOUNT_TO,
      subject: doc.subject,
      text: doc.text,
    };
    // send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        //if failed
        console.log("ERROR: failed to send email: " + error);
        return Response.json({ error: error });
      } else {
        // success
        console.log("SUCCESS: Email sent: " + info.response);
        return Response.json({ success: info.response });
      }
    });
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
