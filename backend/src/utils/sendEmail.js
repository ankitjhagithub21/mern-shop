const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;