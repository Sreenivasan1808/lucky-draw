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

const adminSchema = new mongoose.Schema({
    userName: String,
    password: String
})
const Admin = mongoose.model("Admin", adminSchema)

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

app.post('/api/admin-login', async (req, res) => {
    const {userName, password} = req.body;
    try{
        const admin = await Admin.findOne({userName: userName, password: password}).exec();
        if(admin != null){
            res.status(200).json("Valid credentials");
        }else{
            res.status(201).json("Invalid Credentials");
        }
    }catch(error){
        res.status(500).json("Something went wrong" + error);
        console.log(error);
    }
})

app.post("/api/clear-pool", async (req, res) => {
    try {
        const status = await Entry.deleteMany({}).exec();
        console.log(status);
        if(status){
            res.status(200).json("Deleted all entries");
        }else{
            res.status(201).json("Something wrong");
        }
    } catch (error) {
        res.status(500).json("Server error" + error);
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});