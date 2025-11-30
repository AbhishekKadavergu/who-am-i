// Serverless endpoint for contact form
// Append submissions to a Google Sheet when `GOOGLE_SHEET_ID` and `GOOGLE_SERVICE_ACCOUNT` are provided.

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT; // JSON string or base64-encoded JSON

    let wroteToSheet = false;
    let sentEmail = false;


    // Try to append to Google Sheets if configured
    if (GOOGLE_SHEET_ID && GOOGLE_SERVICE_ACCOUNT) {
        try {
            const { google } = await import('googleapis');

            let serviceAccount;
            try {
                serviceAccount = JSON.parse(GOOGLE_SERVICE_ACCOUNT);
            } catch (e) {
                // Try base64 decode
                console.log('Decoding GOOGLE_SERVICE_ACCOUNT from base64', e);
                try {
                    const decoded = Buffer.from(GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8');
                    serviceAccount = JSON.parse(decoded);
                } catch (e) {
                    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT JSON', e);
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

    if (wroteToSheet || sentEmail) {
        return res.status(200).json({ ok: true, wroteToSheet, sentEmail });
    }

    return res.status(500).json({ error: 'No configured action succeeded' });
}
