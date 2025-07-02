const { createClient } = require('@supabase/supabase-js');

exports.handler = async function (event, context) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key exists:', !!supabaseKey);
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Try to insert a test lead
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { email: 'test@example.com', status: 'test' }
      ]);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: !error,
        data: data,
        error: error,
        supabaseUrl: supabaseUrl,
        hasKey: !!supabaseKey
      })
    };
    
  } catch (e) {
    console.error('Test error:', e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message, stack: e.stack })
    };
  }
}; 