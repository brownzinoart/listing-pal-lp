# Database Setup Guide for ListingPal Unsubscribe System

## Quick Start: Google Sheets (Recommended for MVP)

### 1. Google Sheets Setup
1. Create a new Google Sheet
2. Add headers: `Email` (A1), `Status` (B1), `Date Added` (C1)
3. Share the sheet with your service account email
4. Get the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

### 2. Google Service Account Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON key file
6. Add to Netlify environment variables as `GOOGLE_SERVICE_ACCOUNT_KEY`

### 3. Environment Variables
Add these to your Netlify environment:
```
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

## Alternative Database Options

### Option 1: Supabase (PostgreSQL) - Best for Growth
**Pros:** Free tier, real-time, great dashboard, SQL
**Cons:** Slight learning curve

**Setup:**
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Create table:
```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'subscribed',
  created_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP
);
```
4. Get API keys from Settings > API
5. Install: `npm install @supabase/supabase-js`

### Option 2: PlanetScale (MySQL) - Best for Performance
**Pros:** Free tier, serverless, MySQL compatibility
**Cons:** Limited free tier

**Setup:**
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create database
3. Create table:
```sql
CREATE TABLE subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'subscribed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL
);
```
4. Get connection string from Connect tab
5. Install: `npm install mysql2`

### Option 3: MongoDB Atlas - Best for Flexibility
**Pros:** Free tier, document-based, flexible schema
**Cons:** NoSQL learning curve

**Setup:**
1. Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create cluster
3. Create database `listingpal` and collection `subscribers`
4. Get connection string
5. Install: `npm install mongodb`

## Migration Path

1. **Start with Google Sheets** (current implementation)
2. **Migrate to Supabase** when you need:
   - Real-time features
   - Better querying
   - User authentication
3. **Consider PlanetScale** if you need:
   - MySQL compatibility
   - High performance
   - Branch-based development

## Current Implementation

The unsubscribe system is currently set up with Google Sheets. To switch to another database:

1. Uncomment the desired database code in `netlify/functions/unsubscribe.js`
2. Comment out the Google Sheets code
3. Install the required dependencies
4. Update environment variables
5. Test the unsubscribe flow

## Testing the Unsubscribe System

1. Submit a test email through your form
2. Check the email for the unsubscribe link
3. Click the unsubscribe link
4. Verify you're redirected to `/unsubscribe.html`
5. Check your database/sheet to confirm the status is updated

## Compliance Notes

- The system marks users as "unsubscribed" rather than deleting them
- This maintains compliance with email regulations
- You can track unsubscribe rates and reasons
- Consider adding a "reason for unsubscribing" field later 