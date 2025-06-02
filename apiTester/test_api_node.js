const assert = require('assert');
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api/users';

async function test_create_user() {
    const resp = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'apitest@users.com' })
    });
    assert.strictEqual(resp.status, 201);
    const user = await resp.json();
    assert.strictEqual(user.email, 'apitest@users.com');
    return user.id;
}

async function test_get_users() {
    const resp = await fetch(BASE_URL);
    assert.strictEqual(resp.status, 200);
    const users = await resp.json();
    assert(Array.isArray(users));
    return users;
}

async function test_update_user(user_id) {
    const resp = await fetch(`${BASE_URL}/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'apitest-updated@users.com' })
    });
    assert.strictEqual(resp.status, 200);
    const user = await resp.json();
    assert.strictEqual(user.email, 'apitest-updated@users.com');
}

async function test_delete_user(user_id) {
    const resp = await fetch(`${BASE_URL}/${user_id}`, { method: 'DELETE' });
    assert.strictEqual(resp.status, 204);
}

async function run_all() {
    const user_id = await test_create_user();
    await test_get_users();
    await test_update_user(user_id);
    await test_delete_user(user_id);
    console.log('All tests passed!');
}

run_all().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
