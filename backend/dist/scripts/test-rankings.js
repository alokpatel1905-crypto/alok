"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        const loginData = await loginRes.json();
        const token = loginData.accessToken;
        console.log('LOGGED IN, TOKEN:', token ? 'YES' : 'NO');
        const res = await fetch('http://127.0.0.1:4000/rankings', {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('STATUS:', res.status);
        const data = await res.json();
        console.log('DATA:', data);
    }
    catch (err) {
        console.error('ERROR:', err);
    }
}
test();
//# sourceMappingURL=test-rankings.js.map