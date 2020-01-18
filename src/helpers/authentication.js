import * as userService from '../services/user';
const jwt = require('express-jwt'),
    config = require('../../config/config');

async function isRevoked(req, payload, done) {
    const user = await userService.getUserById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}

export const validateToken = jwt({
    secret: config.secret,
    isRevoked,
});
