// IMPORTANT: Place this file in the following path in your project:
// /netlify/functions/send-email.js

// This function uses the Resend API for maximum deliverability of your welcome email.

// 1. Make sure you've run: npm install resend
const { Resend } = require('resend');
const fs = require('fs').promises;
const path = require('path');

// 2. Your Resend API Key is loaded securely from Netlify's environment variables.
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// 3. Supabase integration for lead capture
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to add lead to Supabase
async function addLeadToSupabase(email) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { email: email, status: 'subscribed' }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log(`Lead captured: ${email}`);
    }
  } catch (error) {
    console.error('Error adding lead to Supabase:', error);
    // Don't throw error - we still want to send the email even if lead capture fails
  }
}

// The main handler function for the Netlify Function
exports.handler = async function (event, context) {
  console.log('Function invoked, method:', event.httpMethod);
  console.log('Environment check - RESEND_API_KEY exists:', !!RESEND_API_KEY);
  console.log('Environment check - SUPABASE_URL exists:', !!supabaseUrl);
  console.log('Environment check - SUPABASE_ANON_KEY exists:', !!supabaseKey);
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('Parsing request body...');
    const { email } = JSON.parse(event.body);
    console.log('Email received:', email);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    // Check if required environment variables exist
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found');
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Server configuration error: Missing API key' }),
      };
    }

    console.log('Initializing Resend...');
    // Initialize Resend with your API key
    const resend = new Resend(RESEND_API_KEY);

    console.log('Reading email template...');
    // Read the HTML template from welcome-email.html
    const templatePath = path.resolve(__dirname, '../../welcome-email.html');
    let htmlBody = await fs.readFile(templatePath, 'utf-8');
    
    // Extract subject from title tag
    const subjectMatch = htmlBody.match(/<title>(.*?)<\/title>/);
    const subject = subjectMatch ? subjectMatch[1] : 'Your ListingPal Deep Dive is Here!';

    // Generate unsubscribe link and replace placeholder
    const unsubscribeUrl = `https://listingpal.netlify.app/.netlify/functions/unsubscribe?email=${encodeURIComponent(email)}`;
    htmlBody = htmlBody.replace('{$unsubscribe}', unsubscribeUrl);

    console.log('Adding lead to Supabase...');
    // Capture the lead in Supabase
    await addLeadToSupabase(email);

    console.log('Sending email via Resend...');
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Wally from ListingPal <wally@listingpal.info>',
      to: [email],
      subject: subject,
      html: htmlBody,
      replyTo: 'wally@listingpal.info',
    });

    // Handle potential errors from the Resend API
    if (error) {
      console.error('Resend API Error:', { error });
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending email.', error: error.message }),
      };
    }

    console.log('Email sent successfully!');
    // Send a success response back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!', data }),
    };

  } catch (exception) {
    console.error('Exception caught:', { exception, message: exception.message, stack: exception.stack });
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'An unexpected error occurred.', 
        error: exception.message,
        debug: process.env.NODE_ENV === 'development' ? exception.stack : undefined
      }),
    };
  }
};
