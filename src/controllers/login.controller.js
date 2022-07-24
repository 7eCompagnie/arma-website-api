const axios = require('axios');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const {config} = require("dotenv");

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
                                    const newUserBody = {
                                        identifier: user.id,
                                        username: user.username,
                                        discriminator: user.discriminator,
                                        avatar: user.avatar,
                                        roles: ["VISITOR_ROLE"],
                                        trained: []
                                    }
                                    const userBody = {
                                        identifier: user.id,
                                        username: user.username,
                                        discriminator: user.discriminator,
                                        avatar: user.avatar
                                    }
                                    if (!data) {
                                        User.createUser(newUserBody)
                                            .then(data => {
                                                const jwtToken = jwt.sign({
                                                    identifier: data.identifier,
                                                    username: data.username,
                                                    discriminator: data.discriminator,
                                                    avatar: data.avatar,
                                                    roles: data.roles,
                                                    trained: data.trained,
                                                    accessToken: token,
                                                    tokenType: tokenType,
                                                    expiresIn: expiresIn,
                                                    refreshToken: refreshToken
                                                }, process.env.JWT_SECRET_KEY, { expiresIn: expiresIn });

                                                res.status(201).json({
                                                    success: true,
                                                    data: jwtToken
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                throw err;
                                            });
                                    } else {
                                        User.updateUser(user.id, userBody)
                                            .then(data => {
                                                const jwtToken = jwt.sign({
                                                    identifier: data.identifier,
                                                    username: data.username,
                                                    discriminator: data.discriminator,
                                                    avatar: data.avatar,
                                                    roles: data.roles,
                                                    accessToken: token,
                                                    tokenType: tokenType,
                                                    expiresIn: expiresIn,
                                                    refreshToken: refreshToken
                                                }, process.env.JWT_SECRET_KEY, { expiresIn: expiresIn });

                                                res.status(200).json({
                                                    success: true,
                                                    data: jwtToken
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
