// Serverless endpoint for contact form
// Supports two actions:
// 1) Append submissions to a Google Sheet when `GOOGLE_SHEET_ID` and `GOOGLE_SERVICE_ACCOUNT` are provided.
// 2) Send notification emails via SendGrid when `SENDGRID_API_KEY` is provided.
// If both are configured, the endpoint will try both (sheet append first, then email).

export default async function handler(req, res) {

    console.log('API /send-contact called with method:', req.method);
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL || process.env.NPM_CONFIG_CONTACT_TO_EMAIL;
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT; // JSON string or base64-encoded JSON

    let wroteToSheet = false;
    let sentEmail = false;

    console.log('Contact form submission received:', { name, email, message });
    console.log('Google Sheet_id:', GOOGLE_SHEET_ID ? 'configured' : 'not configured');

    // Try to append to Google Sheets if configured
    if (GOOGLE_SHEET_ID && GOOGLE_SERVICE_ACCOUNT) {
        try {
            const { google } = await import('googleapis');

            let serviceAccount;
            try {
                serviceAccount = JSON.parse(GOOGLE_SERVICE_ACCOUNT);
            } catch (e) {
                // Try base64 decode
                try {
                    const decoded = Buffer.from(GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8');
                    serviceAccount = JSON.parse(decoded);
                } catch (err) {
                    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT JSON');
                }
            }

            const jwtClient = new google.auth.JWT(
                serviceAccount.client_email,
                null,
                serviceAccount.private_key,
                ['https://www.googleapis.com/auth/spreadsheets']
            );

            await jwtClient.authorize();
            const sheets = google.sheets({ version: 'v4', auth: jwtClient });

            const now = new Date().toISOString();
            const values = [[now, name, email, message]];

            await sheets.spreadsheets.values.append({
                spreadsheetId: GOOGLE_SHEET_ID,
                range: 'Sheet1!A:D',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values },
            });

            wroteToSheet = true;
        } catch (err) {
            console.error('Google Sheets append error', err);
        }
    }

    // Try SendGrid email if configured
    if (SENDGRID_API_KEY) {
        try {
            const sgMail = await import('@sendgrid/mail');
            sgMail.default.setApiKey(SENDGRID_API_KEY);

            const msg = {
                to: TO_EMAIL || 'you@example.com',
                from: TO_EMAIL || 'no-reply@example.com',
                subject: `Portfolio contact from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
            };

            await sgMail.default.send(msg);
            sentEmail = true;
        } catch (err) {
            console.error('sendgrid error', err);
        }
    }

    if (wroteToSheet || sentEmail) {
        return res.status(200).json({ ok: true, wroteToSheet, sentEmail });
    }

    return res.status(500).json({ error: 'No configured action succeeded' });
}
