const assert = require('assert');
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001/api/locations';

async function test_create_location() {
    const resp = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'apitest-location' })
    });
    assert.strictEqual(resp.status, 201);
    const location = await resp.json();
    assert.strictEqual(location.name, 'apitest-location');
    return location.id;
}

async function test_get_locations() {
    const resp = await fetch(BASE_URL);
    assert.strictEqual(resp.status, 200);
    const locations = await resp.json();
    assert(Array.isArray(locations));
    return locations;
}

async function test_delete_location(location_id) {
    const resp = await fetch(`${BASE_URL}/${location_id}`, { method: 'DELETE' });
    assert.strictEqual(resp.status, 200);
    const result = await resp.json();
    assert(result.success);
}

async function run_all() {
    const location_id = await test_create_location();
    await test_get_locations();
    await test_delete_location(location_id);
    console.log('All location tests passed!');
}

run_all().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
