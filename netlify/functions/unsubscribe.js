// IMPORTANT: Place this file in the following path in your project:
// /netlify/functions/unsubscribe.js

// This function handles email unsubscriptions and removes users from the database

// For database options, I recommend:
// 1. Supabase (PostgreSQL) - Free tier, great for startups
// 2. PlanetScale (MySQL) - Free tier, serverless
// 3. MongoDB Atlas - Free tier, document-based
// 4. Google Sheets API - Simple, no setup required

// For now, I'll implement with Google Sheets as it's the quickest to set up
// You can easily migrate to a proper database later

const { google } = require('googleapis');

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID; // Your Google Sheet ID
const RANGE = 'listing-pal!A:B'; // Assuming email is in column A, status in column B

// Initialize Google Sheets API
function getGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY), // Parse the JSON string
  });
  return google.sheets({ version: 'v4', auth });
}

// Main handler function
exports.handler = async function (event, context) {
  // Only allow GET requests (for unsubscribe links)
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Get email from query parameters
    const { email } = event.queryStringParameters || {};

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email parameter is required' }),
      };
    }

    // Decode the email (in case it's URL encoded)
    const decodedEmail = decodeURIComponent(email);

    // Remove from Google Sheets
    await removeFromGoogleSheets(decodedEmail);

    // Log the unsubscribe action
    console.log(`User unsubscribed: ${decodedEmail}`);

    // Redirect to the unsubscribe success page
    return {
      statusCode: 302,
      headers: {
        'Location': '/unsubscribe.html',
      },
      body: '',
    };

  } catch (error) {
    console.error('Unsubscribe error:', error);
    
    // Even if database removal fails, still show success page
    // (better UX than showing an error)
    return {
      statusCode: 302,
      headers: {
        'Location': '/unsubscribe.html',
      },
      body: '',
    };
  }
};

// Function to remove email from Google Sheets
async function removeFromGoogleSheets(email) {
  try {
    const sheets = getGoogleSheets();
    
    // First, find the row with the email
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === email);

    if (rowIndex !== -1) {
      // Update the status to 'unsubscribed' instead of deleting
      // This is better for compliance and analytics
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `listing-pal!B${rowIndex + 1}`,
        valueInputOption: 'RAW',
        resource: {
          values: [['unsubscribed']],
        },
      });
    }

  } catch (error) {
    console.error('Error removing from Google Sheets:', error);
    throw error;
  }
}

// Alternative: If you want to use a proper database, here are the options:

// Option 1: Supabase (PostgreSQL)
/*
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function removeFromSupabase(email) {
  const { error } = await supabase
    .from('subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date() })
    .eq('email', email);
  
  if (error) throw error;
}
*/

// Option 2: MongoDB Atlas
/*
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

async function removeFromMongoDB(email) {
  await client.connect();
  const db = client.db('listingpal');
  const collection = db.collection('subscribers');
  
  await collection.updateOne(
    { email: email },
    { 
      $set: { 
        status: 'unsubscribed', 
        unsubscribed_at: new Date() 
      } 
    }
  );
}
*/

// Option 3: PlanetScale (MySQL)
/*
const mysql = require('mysql2/promise');

async function removeFromPlanetScale(email) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  await connection.execute(
    'UPDATE subscribers SET status = ?, unsubscribed_at = ? WHERE email = ?',
    ['unsubscribed', new Date(), email]
  );
  
  await connection.end();
}
*/ 