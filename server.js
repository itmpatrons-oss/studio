const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

let DATA_FILE = path.join(__dirname, 'data.json');
let BOOKINGS_FILE = path.join(__dirname, 'bookings.json');
let UPLOAD_DIR = path.join(__dirname, 'assets', 'images');

// Vercel read-only filesystem workaround
if (process.env.VERCEL) {
    DATA_FILE = '/tmp/data.json';
    BOOKINGS_FILE = '/tmp/bookings.json';
    UPLOAD_DIR = '/tmp';
    if (!fs.existsSync(DATA_FILE) && fs.existsSync(path.join(__dirname, 'data.json'))) {
        fs.copyFileSync(path.join(__dirname, 'data.json'), DATA_FILE);
    }
    if (!fs.existsSync(BOOKINGS_FILE) && fs.existsSync(path.join(__dirname, 'bookings.json'))) {
        fs.copyFileSync(path.join(__dirname, 'bookings.json'), BOOKINGS_FILE);
    }
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

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

// Get bookings
app.get('/api/bookings', (req, res) => {
    const token = req.headers.authorization;
    if (token !== SECRET_TOKEN) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    fs.readFile(BOOKINGS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.json([]);
        }
        try {
            res.json(JSON.parse(data));
        } catch(e) {
            res.json([]);
        }
    });
});

// Create booking (public endpoint)
app.post('/api/bookings', (req, res) => {
    const newBooking = req.body;
    newBooking.timestamp = new Date().toISOString();
    
    fs.readFile(BOOKINGS_FILE, 'utf8', (err, data) => {
        let bookings = [];
        if (!err && data) {
            try { bookings = JSON.parse(data); } catch(e){}
        }
        bookings.push(newBooking);
        fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), (err) => {
            if (err) {
                console.error('Error writing bookings:', err);
                return res.status(500).json({ error: 'Failed to write booking' });
            }
            res.json({ success: true, message: 'Booking received successfully' });
        });
    });
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
module.exports = app;
