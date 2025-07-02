// IMPORTANT: Place this file in the following path in your project:
// /netlify/functions/send-email.js

// This function uses the Resend API for maximum deliverability of your welcome email.

// 1. Make sure you've run: npm install resend
import { Resend } from 'resend';

// 2. Your Resend API Key is loaded securely from Netlify's environment variables.
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// The main handler function for the Netlify Function
exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    // Initialize Resend with your API key
    const resend = new Resend(RESEND_API_KEY);

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      // Using your verified custom domain email for best deliverability and branding.
      from: 'Wally from ListingPal <wally@listingpal.info>',
      to: [email],
      subject: "Your ListingPal Deep Dive is Here!",
      // Your full HTML email content
      html: `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="x-apple-disable-message-reformatting">
          <title>Your ListingPal Deep Dive is Here!</title>
          <!--[if mso]>
              <noscript>
                  <xml>
                      <o:OfficeDocumentSettings>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                  </xml>
              </noscript>
          <![endif]-->
          <style>
              body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
              table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
              img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
              body { margin: 0 !important; padding: 0 !important; background-color: #f9fafb !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; font-size: 17px !important; }
              .main-table { width: 100% !important; max-width: 600px !important; background-color: #ffffff !important; }
              .benefit-icon { filter: brightness(0) invert(1); }
              @media only screen and (max-width: 600px) {
                  .main-table { width: 100% !important; min-width: 320px !important; }
                  .mobile-padding { padding: 20px !important; }
                  .mobile-font-large { font-size: 24px !important; line-height: 28px !important; }
                  .mobile-font-medium { font-size: 18px !important; line-height: 22px !important; }
                  .mobile-font-small { font-size: 16px !important; line-height: 20px !important; }
              }
          </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
              <tr>
                  <td align="center" style="padding: 20px 10px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="main-table" style="background-color: #ffffff; max-width: 600px;">
                          <!-- Header -->
                          <tr>
                              <td style="background: linear-gradient(135deg, #FFB6C1 0%, #00CED1 100%); background-color: #FFB6C1; padding: 40px 20px; text-align: center;">
                                  <img src="https://mcusercontent.com/1ab0d36c6a26a981d20907640/images/fbf958b2-b5f2-d0f4-b480-9498c57aa68a.png" alt="ListingPal Logo" width="200" style="display: inline-block; max-width: 100%; height: auto; vertical-align: middle;">
                                  <span style="background-color: rgba(255,255,255,0.9); color: #333; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 10px; text-transform: uppercase; letter-spacing: 1px; margin-left: 10px; vertical-align: top; display: inline-block;">DEMO</span>
                              </td>
                          </tr>
                          <!-- Main Content -->
                          <tr>
                              <td style="padding: 40px 30px;" class="mobile-padding">
                                  <h1 style="margin: 0 0 20px; color: #1f2937; font-size: 32px; line-height: 36px; font-weight: bold; text-align: center;" class="mobile-font-large">Thank You for Your Interest in ListingPal!</h1>
                                  <p style="margin: 0 0 30px; color: #6b7280; font-size: 18px; line-height: 24px; text-align: center;" class="mobile-font-medium">Here is the deep dive video into our demo features. The video is intended to give you a look at the possibilities this tool can provide. As we prep for Beta testing, we hope we can chat soon about how ListingPal can help you and your team!</p>
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center" style="padding: 20px 0;"><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="background: linear-gradient(135deg, #00CED1 0%, #FFB6C1 100%); background-color: #00CED1; border-radius: 25px;"><a href="https://youtu.be/w337kCMqfnM" target="_blank" style="display: block; padding: 15px 30px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; text-align: center;">Watch the Deep Dive Video</a></td></tr></table></td></tr></table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
    });

    // Handle potential errors from the Resend API
    if (error) {
      console.error('Resend API Error:', { error });
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending email.', error: error.message }),
      };
    }

    // Send a success response back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!', data }),
    };

  } catch (exception) {
    console.error({ exception });
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An unexpected error occurred.' }),
    };
  }
};
