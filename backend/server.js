// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lucky-draw', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schema and Model
const entrySchema = new mongoose.Schema({
    name: String,
    phone: { type: String, unique: true },
});
const Entry = mongoose.model('Entry', entrySchema);

// Routes
app.get('/api/entries', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/entries', async (req, res) => {
    try {
        const entry = new Entry(req.body);
        await entry.save();
        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/entries/:id', async (req, res) => {
    try {
        await Entry.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Draw winners endpoint
app.post('/api/draw-winners', async (req, res) => {
    try {
        const entries = await Entry.find().toArray();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await db.collection('entries').find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});