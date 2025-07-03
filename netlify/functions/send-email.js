// IMPORTANT: Place this file in the following path in your project:
// /netlify/functions/send-email.js

// This function uses the Resend API for maximum deliverability of your welcome email.

// 1. Make sure you've run: npm install resend
const { Resend } = require('resend');

// 2. Your Resend API Key is loaded securely from Netlify's environment variables.
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// 3. Supabase integration for lead capture
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Email template embedded directly to avoid file path issues in serverless environment
const emailTemplate = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your ListingPal Deep Dive is Here!</title>

    <style>
        /* Reset */
        body, table, td, p, a, li {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Main styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f9fafb !important;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            font-size: 17px !important;
        }

        .main-table {
            width: 100% !important;
            max-width: 600px !important;
            background-color: #ffffff !important;
        }

        .benefit-icon {
            filter: brightness(0) invert(1);
        }

        /* Mobile-first responsive */
        @media only screen and (max-width: 600px) {
            .main-table {
                width: 100% !important;
                min-width: 320px !important;
            }
            .mobile-padding {
                padding: 20px !important;
            }
            .mobile-font-large {
                font-size: 24px !important;
                line-height: 28px !important;
            }
            .mobile-font-medium {
                font-size: 18px !important;
                line-height: 22px !important;
            }
            .mobile-font-small {
                font-size: 16px !important;
                line-height: 20px !important;
            }
            .mobile-center {
                text-align: center !important;
            }
            .mobile-block {
                display: block !important;
                width: 100% !important;
            }
            .mobile-hide {
                display: none !important;
            }
            .benefit-icon-container {
                margin: 0 !important;
            }
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #f9fafb;">
    <!-- Wrapper Table -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 20px 10px;">

                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="main-table" style="background-color: #ffffff; max-width: 600px;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #FFB6C1 0%, #00CED1 100%); background-color: #FFB6C1; padding: 40px 20px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                                                <img src="https://listingpal.netlify.app/logo_email.png"
                        alt="ListingPal Logo"
                        width="200"
                        height="auto"
                        style="display: inline-block; max-width: 100%; height: auto; vertical-align: middle;">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;" class="mobile-padding">

                            <!-- Hero Title -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <h1 style="margin: 0; color: #1f2937; font-size: 32px; line-height: 36px; font-weight: bold; text-align: center;" class="mobile-font-large">
                                            Thank You for Your Interest in ListingPal!
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 30px;">
                                        <p style="margin: 0; color: #6b7280; font-size: 18px; line-height: 24px; text-align: center;" class="mobile-font-medium">
                                            Here is the deep dive video into our demo features. The video is intended to give you a look at the possibilities this tool can provide. As we prep for Beta testing, we hope we can chat soon about how ListingPal can help you and your team! 
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Video CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="background: linear-gradient(135deg, #00CED1 0%, #FFB6C1 100%); background-color: #00CED1; border-radius: 25px;">
                                                    <a href="https://youtu.be/w337kCMqfnM" target="_blank" style="display: block; padding: 15px 30px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; text-align: center;">
                                                        Watch the Deep Dive Video
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Benefits Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 30px 0; color: #d1d5db; font-size: 18px;">
                                        • • •
                                    </td>
                                </tr>
                            </table>

                                                         <!-- Benefit 1 -->
                             <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; margin-bottom: 25px;">
                                 <tr>
                                     <td style="padding: 25px; text-align: center;">
                                         <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                             <tr>
                                                 <td align="center" style="padding-bottom: 20px;">
                                                     <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="benefit-icon-container">
                                                         <tr>
                                                             <td width="80" height="80" style="background: linear-gradient(135deg, #FFB6C1 0%, #00CED1 100%); background-color: #FFB6C1; border-radius: 8px; text-align: center; vertical-align: middle;">
                                                                 <img src="https://storage.mlcdn.com/account_image/1628143/H7yK6SvxrFu1JcmTTeyEdpgNqL1DV4RvXImxFxrS.png"
                                                                 alt="Icon"
                                                                 width="42"
                                                                 height="42"
                                                                 class="benefit-icon"
                                                                 style="display: block; margin: 13px auto;">
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td style="text-align: center;">
                                                     <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 20px; font-weight: bold;">
                                                         AgentSelect™ Integration
                                                     </h3>
                                                     <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 22px;" class="mobile-font-small">
                                                         Stop guessing which model to use—our AI orchestration picks the right one automatically. Our proprietary stack chooses the best-suited model for every task, every time.
                                                     </p>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>

                                                         <!-- Benefit 2 -->
                             <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; margin-bottom: 25px;">
                                 <tr>
                                     <td style="padding: 25px; text-align: center;">
                                         <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                             <tr>
                                                 <td align="center" style="padding-bottom: 20px;">
                                                     <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="benefit-icon-container">
                                                         <tr>
                                                             <td width="80" height="80" style="background: linear-gradient(135deg, #00CED1 0%, #FFB6C1 100%); background-color: #00CED1; border-radius: 8px; text-align: center; vertical-align: middle;">
                                                                 <img src="https://mcusercontent.com/1ab0d36c6a26a981d20907640/images/5b70b74a-406c-9ec8-6036-a685347ae07b.png"
                                                                 alt="Icon"
                                                                 width="32"
                                                                 height="32"
                                                                 class="benefit-icon"
                                                                 style="display: block; margin: 13px auto;">
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td style="text-align: center;">
                                                     <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 20px; font-weight: bold;">
                                                         Market-Tested Content
                                                     </h3>
                                                     <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 22px;" class="mobile-font-small">
                                                         Our campaigns won't just be AI-generated—they'll be trained on high-converting real estate copy that actually sells properties. You'd be getting proven formulas, not experiments.
                                                     </p>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>

                                                         <!-- Benefit 3 -->
                             <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 12px;">
                                 <tr>
                                     <td style="padding: 25px; text-align: center;">
                                         <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                             <tr>
                                                 <td align="center" style="padding-bottom: 20px;">
                                                     <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="benefit-icon-container">
                                                         <tr>
                                                             <td width="80" height="80" style="background: linear-gradient(135deg, #FFB6C1 0%, #00CED1 100%); background-color: #FFB6C1; border-radius: 8px; text-align: center; vertical-align: middle;">
                                                                 <img src="https://storage.mlcdn.com/account_image/1628143/dEboP0G6wiK7KYLyTJulph2vUy5hiJMKeE93GJrF.png"
                                                                 alt="Icon"
                                                                 width="32"
                                                                 height="32"
                                                                 class="benefit-icon"
                                                                 style="display: block; margin: 13px auto;">
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td style="text-align: center;">
                                                     <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 20px; font-weight: bold;">
                                                         Skip the Learning Curve
                                                     </h3>
                                                     <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 22px;" class="mobile-font-small">
                                                         While others spend months figuring out AI prompts and tools, you'll be generating professional campaigns from day one. We've done the heavy lifting—you get the results.
                                                     </p>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>

                        </td>
                    </tr>

                    <!-- CTA Section -->
                    <tr>
                        <td style="padding: 0 30px 40px 30px;" class="mobile-padding">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0; color: #d1d5db; font-size: 18px;">
                                        • • •
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f9ff; border-radius: 15px;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 26px; font-weight: bold;" class="mobile-font-large">
                                            Want to See ListingPal in Action?
                                        </h2>
                                        <p style="margin: 0 0 25px 0; color: #6b7280; font-size: 16px; line-height: 22px;" class="mobile-font-small">
                                            Bring an address, I'll bring ListingPal, and we can give it a spin together over Zoom or coffee. Let's see what this thing can really do for your business.
                                        </p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="background: linear-gradient(135deg, #00CED1 0%, #FFB6C1 100%); background-color: #00CED1; border-radius: 25px;">
                                                    <a href="https://calendly.com/listingpalinfo/30min" target="_blank" style="display: block; padding: 15px 30px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; text-align: center;">
                                                        Let's Test Drive ListingPal
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1f2937; color: #9ca3af; padding: 30px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                                                                 <img src="https://listingpal.netlify.app/logo_email.png"
                                         alt="ListingPal Footer Logo"
                                         width="150"
                                         height="auto"
                                         style="display: block; max-width: 100%; height: auto;">
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <p style="margin: 0; color: #d1d5db; font-size: 14px;">
                                            From address to campaign, in 90 seconds
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 15px;">
                                                                                 <a href="mailto:listingpalinfo@gmail.com" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 13px;">Contact Us</a>
                                         <span style="color: #9ca3af; margin: 0 5px;">|</span>
                                         <a href="https://listingpal.netlify.app/privacy.html" target="_blank" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 13px;">Privacy (Updated July 2025)</a>
                                         <span style="color: #9ca3af; margin: 0 5px;">|</span>
                                         <a href="https://listingpal.netlify.app/terms.html" target="_blank" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 13px;">Terms (Updated July 2025)</a>
                                         <span style="color: #9ca3af; margin: 0 5px;">|</span>
                                         <a href="{$unsubscribe}" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 13px;">Unsubscribe</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                            &copy; 2025 ListingPal. Let's Be Pals. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>
</html>`;

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

    console.log('Preparing email template...');
    // Get the HTML body from embedded template
    let htmlBody = emailTemplate;
    
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
