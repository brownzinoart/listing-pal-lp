import fetch from 'node-fetch';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Wrong method' };

  const { email, name = '' } = JSON.parse(event.body || '{}');
  if (!email) return { statusCode: 422, body: 'Email required' };

  // Check if API key exists
  if (!process.env.ML_API_KEY) {
    console.error('ML_API_KEY environment variable is missing');
    return { statusCode: 500, body: 'Configuration error' };
  }

  try {
    console.log('Attempting to subscribe email:', email);
    
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {   // ML endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.ML_API_KEY}`
      },
      body: JSON.stringify({
        email,
        fields: { name },
        ...(process.env.ML_GROUP_ID && { groups: [process.env.ML_GROUP_ID] })
      })
    });

    console.log('MailerLite response status:', res.status);
    
    if (!res.ok && res.status !== 409) {
      const errorText = await res.text();
      console.error('MailerLite API error:', res.status, errorText);
      return { statusCode: res.status, body: errorText };
    }

    // Treat "already on list" (409) as success
    return {
      statusCode: [200, 409].includes(res.status) ? 200 : res.status,
      body: "OK",
    };
  } catch (error) {
    console.error('Error in subscribe function:', error);
    return { statusCode: 500, body: 'Internal server error' };
  }
};
