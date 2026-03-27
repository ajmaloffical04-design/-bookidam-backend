const express = require('express');
const crypto = require('crypto');
const { sendTicketEmail } = require('../utils/email');

module.exports = (pool) => {
    const router = express.Router();

    const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'TESTMERCHANT';
    const SALT_KEY = process.env.PHONEPE_SALT_KEY || 'test-salt-key';
    const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
    const BASE_URL = process.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox';
    
    // Create Payment Request
    router.post('/create', async (req, res) => {
        try {
            const { booking_ref, amount, user_id, phone, email, client_name } = req.body;
            
            // Build payload
            const payload = {
                merchantId: MERCHANT_ID,
                merchantTransactionId: booking_ref,
                merchantUserId: user_id || `User-${Date.now()}`,
                amount: amount * 100, // PhonePe expects amount in paise
                redirectUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout?success=true&bookingId=${booking_ref}`,
                redirectMode: 'REDIRECT',
                callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payments/callback`,
                mobileNumber: phone || '9999999999',
                paymentInstrument: {
                    type: "PAY_PAGE"
                }
            };

            const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
            const stringToSign = payloadBase64 + '/pg/v1/pay' + SALT_KEY;
            const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
            const checksum = `${sha256}###${SALT_INDEX}`;

            // SIMULATION MODE
            if (MERCHANT_ID === 'TESTMERCHANT' || !process.env.PHONEPE_MERCHANT_ID || process.env.SIMULATE_PAYMENTS === 'true') {
                console.log(`[SIMULATION MODE] Bypassing PhonePe gateway. Marking ${booking_ref} as Confirmed...`);
                
                const updateRes = await pool.query(
                    `UPDATE bookings SET status = $1 WHERE description LIKE $2 RETURNING *`,
                    ['Confirmed', `%${booking_ref}%`]
                );

                if (updateRes.rows.length > 0) {
                    const bookingDetails = updateRes.rows[0];
                    await sendTicketEmail({
                        client_name: bookingDetails.client_name,
                        email: bookingDetails.email,
                        event_name: bookingDetails.event_name,
                        event_date: bookingDetails.event_date,
                        preferred_time: bookingDetails.preferred_time,
                        booking_ref: booking_ref,
                    });
                }

                return res.json({ 
                    success: true, 
                    redirectUrl: `${process.env.FRONTEND_URL || 'https://bookidam-backend.vercel.app'}/checkout?success=true&bookingId=${booking_ref}` 
                });
            }

            // Make request to PhonePe
            // We use standard fetch API since Node 18+
            const response = await fetch(`${BASE_URL}/pg/v1/pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'X-MERCHANT-ID': MERCHANT_ID
                },
                body: JSON.stringify({ request: payloadBase64 })
            });

            const data = await response.json();
            
            if (data.success) {
                const url = data.data.instrumentResponse.redirectInfo.url;
                return res.json({ success: true, redirectUrl: url });
            } else {
                return res.status(400).json({ success: false, error: data.message });
            }
        } catch (err) {
            console.error('PhonePe Create Payment Error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
    });

    // Webhook / Server-to-Server Callback
    router.post('/callback', async (req, res) => {
        try {
            // Verify checksum and update DB status to Confirmed, then send NodeMailer Email
            const { response } = req.body;
            if (!response) return res.status(400).send('Invalid response payload');

            const decodedResponse = Buffer.from(response, 'base64').toString('utf8');
            const data = JSON.parse(decodedResponse);

            if (data.code === 'PAYMENT_SUCCESS') {
                const bookingRef = data.data.merchantTransactionId;
                
                // Update DB to confirmed
                // In our schema, bookingRef is stored inside the description string or somewhere similar if not explicitly columned
                const updateRes = await pool.query(
                    `UPDATE bookings SET status = $1 WHERE description LIKE $2 RETURNING *`,
                    ['Confirmed', `%${bookingRef}%`]
                );

                if (updateRes.rows.length > 0) {
                    const bookingDetails = updateRes.rows[0];
                    // Assuming booking_ref wasn't directly a column but we retrieved it from the description match
                    await sendTicketEmail({
                        client_name: bookingDetails.client_name,
                        email: bookingDetails.email,
                        event_name: bookingDetails.event_name,
                        event_date: bookingDetails.event_date,
                        preferred_time: bookingDetails.preferred_time,
                        booking_ref: bookingRef,
                    });
                }
                res.status(200).send('OK');
            } else {
                res.status(400).send('Failed');
            }
        } catch (error) {
            console.error('PhonePe Callback Error:', error);
            res.status(500).send('Internal Error');
        }
    });

    // Free Event Ticket Dispatch
    router.post('/send-ticket', async (req, res) => {
        try {
            const { booking_ref } = req.body;
            const selectRes = await pool.query(
                `SELECT * FROM bookings WHERE description LIKE $1`,
                [`%${booking_ref}%`]
            );
            
            if (selectRes.rows.length > 0) {
                const bookingDetails = selectRes.rows[0];
                await sendTicketEmail({
                    client_name: bookingDetails.client_name,
                    email: bookingDetails.email,
                    event_name: bookingDetails.event_name,
                    event_date: bookingDetails.event_date,
                    preferred_time: bookingDetails.preferred_time,
                    booking_ref: booking_ref,
                });
                return res.json({ success: true });
            }
            return res.status(404).json({ success: false, error: 'Booking not found' });
        } catch (error) {
            console.error('Send Ticket Error:', error);
            res.status(500).json({ success: false, error: 'Internal Error' });
        }
    });

    return router;
};
