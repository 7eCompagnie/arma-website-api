const axios = require('axios');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

exports.revoke = async (req, res) => {
    try {
        if (!req.body.token) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            const token = req.body.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const headers = {
                ContentType: "application/xxx-www-form-urlencoded",
            }
            const body = new URLSearchParams();
            body.append('token', token);
            body.append('client_id', process.env.DISCORD_CLIENT_ID);
            body.append('client_secret', process.env.DISCORD_CLIENT_SECRET);

            axios.post('https://discordapp.com/api/oauth2/token/revoke', body, { headers })
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: "Token revoked."
                    });
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}
