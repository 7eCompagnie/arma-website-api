// Load modules
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const database = require('./configs/db.config');

// Variables
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
database.connect();

// Routes
const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');
const revokeRoutes = require('./routes/revoke.route');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/revoke', revokeRoutes);

app.listen(port, () => {
    console.log(`[SUCCESS] => Server is running on port ${port}.`);
});
