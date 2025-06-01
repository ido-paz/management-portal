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
    res.json(readUsers());
});

// POST create user
router.post('/', (req, res) => {
    const users = readUsers();
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const id = Date.now().toString();
    const user = { id, email };
    users.push(user);
    writeUsers(users);
    res.status(201).json(user);
});

// DELETE user
router.delete('/:id', (req, res) => {
    let users = readUsers();
    const { id } = req.params;
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    if (users.length === initialLength) return res.status(404).json({ error: 'User not found' });
    writeUsers(users);
    res.status(204).end();
});

// PUT update user
router.put('/:id', (req, res) => {
    let users = readUsers();
    const { id } = req.params;
    const { email } = req.body;
    let user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.email = email;
    writeUsers(users);
    res.json(user);
});

module.exports = router;
