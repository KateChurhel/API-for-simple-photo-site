const userService = require( '../services/user'),
    expressJwt = require('express-jwt'),
    config = require('../../config/config');

async function isRevoked(req, payload, done) {
    const user = await userService.getUserById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}

// const validateToken = jwt({
//     secret: config.secret,
//     isRevoked,
// });


const jwt = () => {
    const secret = config.secret;
    return expressJwt({
        secret,
        isRevoked,
    }).unless({ path: [
        // public routes that don't require authentication
        '/users/authenticate',
        '/users/register',
        '/photos',
        '/photos/tags',
        /\/photos\/tags\/(.)/,
    ] });
};

module.exports = jwt;
