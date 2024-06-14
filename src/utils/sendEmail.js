const nodemailer = require("nodemailer");
const { emailCreds } = require("../config/config");

const transporter = nodemailer.createTransport({
  service: emailCreds.service,
  secure: true,
  auth: {
    user: emailCreds.userEmail,
    pass: emailCreds.appPassword,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"Adnan Kachchawala" <${emailCreds.userEmail}>`,
      to: to,
      subject: subject,
      // text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sended successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
