const { Client } = require('pg');

async function testConnection(url) {
  const client = new Client({ connectionString: url });
  try {
    console.log(`Testing: ${url.replace(/:[^:@/]+@/, ':****@')}`);
    await client.connect();
    const res = await client.query('SELECT current_database(), current_schema()');
    console.log('Success:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Failed:', err.message);
  }
}

const poolerUrl = "postgresql://postgres.iwzzkfqwtyuzukubjjyg:%40Ghostchudel12@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres";
const directUrl = "postgresql://postgres.iwzzkfqwtyuzukubjjyg:%40Ghostchudel12@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres";

(async () => {
  console.log('--- Pooler Test ---');
  await testConnection(poolerUrl);
  console.log('\n--- Direct Test ---');
  await testConnection(directUrl);
})();
