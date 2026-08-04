const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            html: options.html || options.text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`❌ Email error: ${error.message}`);
        throw error;
    }
};

// Contact notification email to admin
const sendContactNotification = async (contactData) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">📬 New Contact Message</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>From:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Subject:</strong> ${contactData.subject}</p>
                <hr style="border: 1px solid #e5e7eb; margin: 15px 0;">
                <p><strong>Message:</strong></p>
                <p style="line-height: 1.6;">${contactData.message}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">
                This message was sent from your portfolio contact form.
            </p>
        </div>
    `;

    await sendEmail({
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${contactData.subject}`,
        html
    });
};

// Confirmation email to sender
const sendContactConfirmation = async (contactData) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Thank You for Reaching Out! 🎉</h2>
            <p>Hi ${contactData.name},</p>
            <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
            <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Your message:</strong></p>
                <p style="color: #6b7280;">"${contactData.message.substring(0, 200)}..."</p>
            </div>
            <p>Best regards,<br><strong>Salma Tabassum</strong></p>
        </div>
    `;

    await sendEmail({
        to: contactData.email,
        subject: 'Thank you for contacting me!',
        html
    });
};

module.exports = { sendEmail, sendContactNotification, sendContactConfirmation };
