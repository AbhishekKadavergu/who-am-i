# who-am-i

My portfolio website – projects, passions, and more beyond the resume.

## Environment Variables

This project uses environment variables to manage sensitive configuration. Use one of these approaches:

### Option 1: `.env` files (Recommended for development)

- Copy `.env.example` to `.env.local` and fill in your test values.
- `.env.local` is git-ignored and safe for local development.
- Required variables:
  - `SENDGRID_API_KEY`: Your SendGrid API key (get one from [SendGrid](https://sendgrid.com))
  - `CONTACT_TO_EMAIL`: Email address to receive contact form submissions

### Option 2: Platform environment variables (Production)

**For Vercel:**

- Go to Project Settings → Environment Variables
- Add `SENDGRID_API_KEY` and `CONTACT_TO_EMAIL` for Production

**For Netlify:**

- Go to Site Settings → Build & Deploy → Environment
- Add the same variables

### Contact form setup

This project includes a serverless endpoint template at `api/send-contact.js` that forwards contact form submissions to an email provider (SendGrid).

```bash
# Create a .env.local file from the template
cp .env.example .env.local
# Edit .env.local with test values
npm run dev  # Environment variables are automatically loaded
```

If you prefer a different email provider, edit `api/send-contact.js` to use your provider's SDK.

### Google Sheets integration (optional)

Instead of sending an email, you can have contact submissions appended to a Google Sheet. The endpoint supports this via a Google service account.

Steps:

1. Create a Google Cloud project and enable the Google Sheets API.
2. Create a service account and generate a JSON key.
3. Share the target Google Sheet with the service account's client_email (from the JSON key) with Editor access.
4. Add the following environment variables to your deployment or `.env.local`:
  - `GOOGLE_SHEET_ID` — the ID portion of the sheet URL
  - `GOOGLE_SERVICE_ACCOUNT` — either the raw service account JSON or the base64-encoded JSON (base64 helps avoid multiline issues in some dashboards)

Example (base64 encode on macOS/Linux):

```bash
cat service-account.json | base64 | pbcopy
# Paste into GOOGLE_SERVICE_ACCOUNT in your host's env var UI
```

When both Google Sheets and SendGrid are configured, the endpoint will try to append the row to the sheet first and then send the notification email.

