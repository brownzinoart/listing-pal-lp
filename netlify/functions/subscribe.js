import fetch from 'node-fetch';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Wrong method' };

  const { email, name = '' } = JSON.parse(event.body || '{}');
  if (!email) return { statusCode: 422, body: 'Email required' };

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
      groups: [process.env.ML_GROUP_ID]
    })
  });

  // Treat "already on list" (409) as success
  return {
    statusCode: [200, 409].includes(res.status) ? 200 : res.status,
    body: "OK",
  };
};
