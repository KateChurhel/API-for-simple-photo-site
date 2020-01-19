const userService = require('../services/user'),
    express = require( 'express');
const router = express.Router(),

    authenticate = async (req, res) => {
        try {
            const user = await userService.authenticate(req.body);

            user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    register = async (req, res) => {
        try {
            await userService.create(req.body);

            res.json({});
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getAllUsers = async (req, res) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getCurrentUser = async (req, res) => {
        try {
            const user = await userService.getUserById(req.user.sub);

            user ? res.json(user) : res.sendStatus(404);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getUserById = async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);

            user ? res.json(user) : res.sendStatus(404);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateUser = async (req, res) => {
        try {
            const user = await userService.updateUser(req.params.id, req.body);

            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteUser = async (req, res) => {
        try {
            await userService.deleteUser(req.params.id);

            res.json({});
        } catch (err) {
            res.status(400).json(err);
        }
    };

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAllUsers);
router.get('/current', getCurrentUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
