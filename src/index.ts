// Modules
const dotenv = require('dotenv').config();
const express = require('express');

// Variables
const app = express();

// Server listener
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
