exports.handler = async function () {
  try {
    const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    return {
      statusCode: 200,
      body: JSON.stringify({
        startsWithBrace: keyRaw && keyRaw.trim().startsWith('{'),
        endsWithBrace: keyRaw && keyRaw.trim().endsWith('}'),
        length: keyRaw ? keyRaw.length : 0,
        sample: keyRaw ? keyRaw.slice(0, 100) : '',
        privateKeySample: keyRaw ? keyRaw.includes('PRIVATE KEY') : false,
        doubleBackslashCount: keyRaw ? (keyRaw.match(/\\n/g) || []).length : 0,
        singleBackslashCount: keyRaw ? (keyRaw.match(/\n/g) || []).length : 0,
      }),
    };
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
}; 