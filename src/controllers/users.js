import * as userService from '../services/user';

export const authenticate = async (req, res) => {
    try {
        const user = await userService.authenticate(req.body);

        user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const register = async (req, res) => {
    try {
        await userService.create(req.body);

        res.json({});
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.sub);

        user ? res.json(user) : res.sendStatus(404);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        user ? res.json(user) : res.sendStatus(404);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);

        res.json({});
    } catch (err) {
        res.status(400).json(err);
    }
};
