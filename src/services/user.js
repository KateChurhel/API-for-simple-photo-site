const jwt = require( 'jsonwebtoken'),
    bcrypt = require( 'bcryptjs'),
    config = require('../../config/config'),
    db = require('src/helpers/db');
const User = db.User,

    authenticate = async ({
        username, password,
    }) => {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.hash)) {
            const {
                    // eslint-disable-next-line no-unused-vars
                    hash, ...userWithoutHash
                } = user.toObject(),
                token = jwt.sign({ sub: user.id }, config.secret);
            return {
                ...userWithoutHash,
                token,
            };
        }
    },

    getAllUsers = async () => {
        return await User.find().select('-hash');
    },

    getUserById = async (id) => {
        return await User.findById(id).select('-hash');
    },

    create = async (userParam) => {
        if (await User.findOne({ username: userParam.username })) {
            throw `Username "${ userParam.username }" is already taken`;
        }

        const user = new User(userParam);

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }

        // save user
        await user.save();
    },

    updateUser = async (id, userParam) => {
        const user = await User.findById(id);

        // validate
        if (!user) {
            throw 'User not found';
        }
        if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
            throw `Username "${ userParam.username }" is already taken`;
        }

        // hash password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(userParam.password, 10);
        }

        Object.assign(user, userParam);

        await user.save();

        return user;
    },

    deleteUser = async(id) => {
        await User.findByIdAndRemove(id);
    };

module.exports = {
    authenticate,
    getAllUsers,
    getUserById,
    create,
    updateUser,
    deleteUser,
};
