const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port == 465, // true for 465, false for other ports
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

/**
 * Send contact form email to site owner.
 * @param {Object} data - { name, email, subject, message }
 */
const sendContactEmail = async (data) => {
  const mailOptions = {
    from: `${data.name} <${data.email}>`,
    to: config.email.user, // site owner
    subject: data.subject || 'New Contact Form Submission',
    text: `Message from ${data.name} (${data.email}):\n\n${data.message}`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendContactEmail };
