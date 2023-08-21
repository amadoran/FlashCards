var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

/* VERIFICADOR DE AUTENTICACIÓN */

var authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            console.log(user)

            req.user = user;
            return next();
        });
    } else {
        return res.sendStatus(401);
    }
};

module.exports = authenticateJWT;