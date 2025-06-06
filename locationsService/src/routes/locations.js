const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../data/locations.json');

function readLocations() {
    if (!fs.existsSync(dataFile)) return [];
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function writeLocations(locations) {
    fs.writeFileSync(dataFile, JSON.stringify(locations, null, 2));
}

router.get('/', (req, res) => {
    res.json(readLocations());
});

router.post('/', (req, res) => {
    const locations = readLocations();
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing request body' });
    }
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const id = locations.length ? Math.max(...locations.map(l => l.id)) + 1 : 1;
    const location = { id, name };
    locations.push(location);
    writeLocations(locations);
    res.status(201).json(location);
});

router.delete('/:id', (req, res) => {
    let locations = readLocations();
    const { id } = req.params;
    const initialLength = locations.length;
    locations = locations.filter(l => l.id !== Number(id));
    if (locations.length === initialLength) return res.status(404).json({ error: 'Location not found' });
    writeLocations(locations);
    res.json({ success: true });
});

module.exports = router;
