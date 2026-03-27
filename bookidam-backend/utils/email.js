const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const sendTicketEmail = async (bookingDetails) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ SMTP credentials not configured. Skipping email dispatch.');
        return false;
    }

    const transporter = createTransporter();

    const mailOptions = {
        from: `"BOOKIDAM Notifications" <${process.env.SMTP_USER}>`,
        to: bookingDetails.email,
        subject: `Your Ticket Confirmed: ${bookingDetails.event_name}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #00A372;">Booking Confirmed! 🎉</h2>
                <p>Hi ${bookingDetails.client_name},</p>
                <p>Your ticket for <strong>${bookingDetails.event_name}</strong> has been confirmed.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Booking ID:</strong> ${bookingDetails.booking_ref}</p>
                    <p><strong>Date:</strong> ${bookingDetails.event_date}</p>
                    <p><strong>Time Slot:</strong> ${bookingDetails.preferred_time}</p>
                </div>
                
                <p>Please keep this Booking ID handy. You can use it to download your QR ticket from the website.</p>
                
                <br/>
                <p>Best regards,<br/>The BOOKIDAM Team</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Ticket Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendTicketEmail };
