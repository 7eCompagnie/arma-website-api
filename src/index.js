// Load modules
const express = require('express');
const dotenv = require('dotenv').config();

// Variables
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

// Routes
const userRoutes = require('./routes/user.route');

app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
    console.log(`[SUCCESS] => Server is running on port ${port}.`);
});
