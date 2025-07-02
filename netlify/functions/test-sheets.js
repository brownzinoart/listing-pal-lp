// Test function to check Google Sheets setup
const { google } = require('googleapis');

exports.handler = async function (event, context) {
  try {
    // Check if environment variables exist
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!sheetId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'GOOGLE_SHEET_ID not found in environment variables',
          message: 'Please add GOOGLE_SHEET_ID to your Netlify environment variables'
        })
      };
    }
    
    if (!serviceAccountKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'GOOGLE_SERVICE_ACCOUNT_KEY not found in environment variables',
          message: 'Please add GOOGLE_SERVICE_ACCOUNT_KEY to your Netlify environment variables'
        })
      };
    }
    
    // Try to parse the service account key
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (parseError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Invalid GOOGLE_SERVICE_ACCOUNT_KEY format',
          message: 'The service account key should be valid JSON'
        })
      };
    }
    
    // Try to connect to Google Sheets
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      credentials: credentials,
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Try to read from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'listing-pal!A1:C1', // Just read the headers
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Google Sheets connection successful!',
        sheetId: sheetId,
        headers: response.data.values || [],
        serviceAccountEmail: credentials.client_email
      })
    };
    
  } catch (error) {
    console.error('Test function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Google Sheets connection failed',
        message: error.message,
        details: error.toString()
      })
    };
  }
}; 