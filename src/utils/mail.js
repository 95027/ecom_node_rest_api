const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.server.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_AUTH,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_AUTH,
      to,
      subject,
      html,
    });
    console.log("message sent: ", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
