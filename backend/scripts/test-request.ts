async function test() {
  try {
    const loginRes = await fetch('http://127.0.0.1:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: '123456',
      }),
    });
    
    const loginData: any = await loginRes.json();
    const token = loginData.accessToken;
    console.log('LOGGED IN, TOKEN:', token);

    const res = await fetch('http://127.0.0.1:4000/programs/id/dummy', {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    console.log('STATUS:', res.status);
    const data = await res.json();
    console.log('DATA:', data);
  } catch (err: any) {
    console.error('ERROR:', err);
  }
}

test();
