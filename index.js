// Load modules
const express = require('express');
const dotenv = require('dotenv').config();

// Variables
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`[SUCCESS] => Server is running on port ${port}`);
});
