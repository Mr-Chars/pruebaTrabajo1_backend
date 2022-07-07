"use strict";
const jwt = require('jsonwebtoken');
const config = require('config');
let checkToken = (req, res, next) => {
    let token = req.body.token;
    if (!token) {
        token = req.query.token;
    }
    jwt.verify(token, config.get('configToken.SEED'), (err, decoded) => {
        if (err) {
            return res.status(401).json({
                msn: req.body,
                err,
            });
        }
        req.user = decoded.user;
        next();
    });
};
module.exports = checkToken;
