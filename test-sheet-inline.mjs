import dotenv from 'dotenv';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Load .env.local
dotenv.config({ path: '.env.local' });

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT;

console.log('Ì≥ã Testing Google Sheets integration...\n');
console.log(`GOOGLE_SHEET_ID found: ${!!GOOGLE_SHEET_ID}`);
console.log(`GOOGLE_SERVICE_ACCOUNT length: ${GOOGLE_SERVICE_ACCOUNT?.length || 0} chars\n`);

if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT) {
  console.error('‚ùå Missing env vars');
  process.exit(1);
}

try {
  // Parse service account
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(GOOGLE_SERVICE_ACCOUNT);
    console.log('‚úì Service account parsed as raw JSON');
  } catch (e) {
    const decoded = Buffer.from(GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8');
    serviceAccount = JSON.parse(decoded);
    console.log('‚úì Service account decoded from base64');
  }

  console.log(`‚úì Service account email: ${serviceAccount.client_email}\n`);

  // Create JWT client
  const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  console.log('‚è≥ Authorizing with Google...');
  await jwtClient.authorize();
  console.log('‚úì Authorization successful\n');

  // Create Sheets API client
  const sheets = google.sheets({ version: 'v4', auth: jwtClient });

  // Prepare test row
  const now = new Date().toISOString();
  const testRow = [now, 'Test User (Local)', 'test@local.example.com', 'Test from local script'];

  console.log(`Ì≥ù Appending test row to sheet:`);
  console.log(`   Timestamp: ${now}`);
  console.log(`   Name: ${testRow[1]}`);
  console.log(`   Email: ${testRow[2]}\n`);

  // Append to sheet
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Sheet1!A:D',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [testRow] },
  });

  console.log(`‚úì Row appended successfully!`);
  console.log(`  Updated range: ${response.data.updates.updatedRange}`);
  console.log(`  Updated rows: ${response.data.updates.updatedRows}\n`);
  console.log(`Ìæâ Test PASSED! Check your sheet: https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}`);

} catch (error) {
  console.error('‚ùå Test FAILED:', error.message);
  process.exit(1);
}
