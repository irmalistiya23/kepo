'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const routes = require('./routes/userRoutes');
const { sequelize } = require('./models');

dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api', routes);

// Sync database and start server
const PORT = 3001; // Menggunakan port 3001 untuk backend
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to sync database:', err);
});