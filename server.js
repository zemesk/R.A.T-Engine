require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('fs'));

// API routes
app.use('/api', apiRoutes);

// Add this route before your catch-all route
app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'fs', 'results.html'));
});

// Serve main HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'fs', 'main.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});