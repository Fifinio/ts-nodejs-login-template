import jwt from 'jsonwebtoken';
import {config} from '../../common/config/env.config';
import crypto from 'crypto';

const secret = config.jwt_secret;

export const verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

export const validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


export const validJWTNeeded = (req, res, next) => {
    let authorization = req.headers['authorization']?.split(' ');
    if (authorization && authorization[0] === 'Bearer') {
        try {
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};