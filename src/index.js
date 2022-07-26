// Load modules
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const database = require('./configs/db.config');

// Variables
const app = express();
const port = process.env.SERVER_PORT || 4000;

app.use(express.json());
app.use(cors({origin: 'https://app.arma.la7e.fr'}));
app.use(fileUpload( {}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
database.connect();

// Routes
const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');
const revokeRoutes = require('./routes/revoke.route');
const trainingRoutes = require('./routes/training.route');
const operationRoutes = require('./routes/operation.route');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/trainings', trainingRoutes);
app.use('/api/v1/operations', operationRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/revoke', revokeRoutes);

app.listen(port, () => {
    console.log(`[SUCCESS] => Server is running on port ${port}.`);
});