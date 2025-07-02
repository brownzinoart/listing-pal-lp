// IMPORTANT: Place this file in the following path in your project:
// /netlify/functions/unsubscribe.js

// This function handles email unsubscriptions and removes users from the database

// For database options, I recommend:
// 1. Supabase (PostgreSQL) - Free tier, great for startups
// 2. PlanetScale (MySQL) - Free tier, serverless
// 3. MongoDB Atlas - Free tier, document-based
// 4. Google Sheets API - Simple, no setup required

// Using Supabase for database operations

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Remove from Supabase
    await removeFromSupabase(decodedEmail);

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

// Function to remove email from Supabase
async function removeFromSupabase(email) {
  try {
    // Update the status to 'unsubscribed' instead of deleting
    // This is better for compliance and analytics
    const { error } = await supabase
      .from('leads')
      .update({ status: 'unsubscribed' })
      .eq('email', email);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

  } catch (error) {
    console.error('Error removing from Supabase:', error);
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