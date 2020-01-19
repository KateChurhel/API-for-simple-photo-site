const photoService = require('../services/photo'),
    express = require('express');
const router = express.Router(),

    addPhoto = async (req, res) => {
        try {
            const photo = await photoService.create(req.body);

            res.json(photo);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getAllPhotos = async (req, res) => {
        try {
            const photos = await photoService.getAllPhotos();

            res.json(photos);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updatePhoto = async (req, res) => {
        try {
            await photoService.updatePhoto(req.params.id, req.body);

            res.json({});
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deletePhoto = async (req, res) => {
        try {
            await photoService.deletePhoto(req.params.id);

            res.json({});
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getAllPhotosByUserId = async (req, res) => {
        try {
            const photos = await photoService.getAllPhotosByUserId(req.params.id);

            res.json(photos);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getAllTags = async (req, res) => {
        try {
            const photos = await photoService.getAllPhotos(),
                tags = [];

            photos.forEach(photo => {
                tags.push(...photo.tags);
            });
            res.json([...new Set(tags)]);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getPhotoById = async (req, res) => {
        try {
            const photo = await photoService.getPhotoById(req.params.id);

            res.json(photo);
        } catch (err) {
            res.status(404).json(err);
        }
    },

    getPhotoByTag = async (req, res) => {
        try {
            const photo = await photoService.getPhotoByTag(req.params.tag);

            res.json(photo);
        } catch (err) {
            res.status(404).json(err);
        }
    };

router.get('/', getAllPhotos);
router.get('/tags', getAllTags);
router.get('/tags/:tag', getPhotoByTag);
router.put('/:id', updatePhoto);
router.delete('/:id', deletePhoto);
router.get('/:id', getPhotoById);
router.get('/user/:id', getAllPhotosByUserId);
router.post('/add-photo', addPhoto);

module.exports = router;
