const axios = require('axios');
const User = require('../models/user.model');
exports.login = async (req, res) => {
    try {
        if (!req.body.code) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            const body = new URLSearchParams();
            body.append('client_id', process.env.DISCORD_CLIENT_ID);
            body.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
            body.append('grant_type', 'authorization_code');
            body.append('code', req.body.code);
            body.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);

            axios.post('https://discordapp.com/api/oauth2/token', body)
                .then(response => {
                    const token = response.data.access_token;
                    const refreshToken = response.data.refresh_token;
                    const tokenType = response.data.token_type;
                    const expiresIn = response.data.expires_in;
                    const headers = {
                        Authorization: `Bearer ${token}`
                    };

                    axios.get('https://discordapp.com/api/users/@me', { headers })
                        .then(response => {
                            const user = response.data;
                            User.getUser(user.id)
                                .then(data => {
                                    const userBody = {
                                        identifier: user.id,
                                        email: user.email,
                                        username: user.username,
                                        discriminator: user.discriminator,
                                        avatar: user.avatar,
                                    }
                                    if (!data) {
                                        User.createUser(userBody)
                                            .then(data => {
                                                data.accessToken = token;
                                                data.tokenType = tokenType;
                                                data.expiresIn = expiresIn;
                                                data.refreshToken = refreshToken;

                                                res.status(201).json({
                                                    success: true,
                                                    data: data
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                throw err;
                                            });
                                    } else {
                                        User.updateUser(user.id, userBody)
                                            .then(data => {
                                                data.accessToken = token;
                                                data.tokenType = tokenType;
                                                data.expiresIn = expiresIn;
                                                data.refreshToken = refreshToken;

                                                res.status(200).json({
                                                    success: true,
                                                    data: data
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                throw err;
                                            });
                                        }
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500);
                                });
                        })
                        .catch(err => {
                            res.status(500).json({
                                success: false,
                                message: err.message
                            });
                            console.log(err);
                        });
        }
    } catch (err) {
        res.send(500).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}
