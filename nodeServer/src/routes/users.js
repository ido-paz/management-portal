const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../data/users.json');

// Helper to read users
function readUsers() {
    if (!fs.existsSync(dataFile)) return [];
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

// Helper to write users
function writeUsers(users) {
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

// GET all users
router.get('/', (req, res) => {
    console.debug('GET /api/users');   
    res.json(readUsers());
});

// POST create user
router.post('/', (req, res) => {
    console.debug('post /api/users'); 
    const users = readUsers();
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing request body' });
    }
    const { email } = req.body;
    console.debug(`Creating user with email ${email}`);
    if (!email) return res.status(400).json({ error: 'Email required' });
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const user = { id, email };
    users.push(user);
    writeUsers(users);
    res.status(201).json(user);
});

// DELETE user
router.delete('/:id', (req, res) => {
    console.debug('delete /api/users'); 
    let users = readUsers();
    const { id } = req.params;
    console.debug(`Deleting user with id ${id}`);
    const initialLength = users.length;
    users = users.filter(u => u.id !== Number(id));
    if (users.length === initialLength) return res.status(404).json({ error: 'User not found' });
    writeUsers(users);
    res.status(204).end();
});

// PUT update user
router.put('/:id', (req, res) => {
    console.debug('put /api/users'); 
    let users = readUsers();
    const { id } = req.params;
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing request body' });
    }
    const { email } = req.body;
    console.debug(`Updating user ${id} with email ${email}`);
    let user = users.find(u => u.id === Number(id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.email = email;
    writeUsers(users);
    res.json(user);
});

module.exports = router;
