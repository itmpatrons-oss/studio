const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'assets', 'images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
// Serve static files from the root directory so we can run index.html and admin.html
app.use(express.static(__dirname));

// Get data
app.get('/api/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';
const SECRET_TOKEN = 'LUMINA_SECURE_TOKEN_2026';

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ success: true, token: SECRET_TOKEN });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Upload image endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    const token = req.headers.authorization;
    if (token !== SECRET_TOKEN) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = 'assets/images/' + req.file.filename;
    res.json({ success: true, url: fileUrl });
});

// Update data
app.post('/api/data', (req, res) => {
    const token = req.headers.authorization;
    if (token !== SECRET_TOKEN) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    const newData = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('Error writing data:', err);
            return res.status(500).json({ error: 'Failed to write data' });
        }
        res.json({ message: 'Data updated successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
