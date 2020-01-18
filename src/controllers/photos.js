import * as photoService from '../services/photo';

export const addPhoto = async (req, res) => {
    try {
        const photo = await photoService.create(req.body);

        res.json(photo);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getAllPhotos = async (req, res) => {
    try {
        const photos = await photoService.getAllPhotos();

        res.json(photos);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updatePhoto = async (req, res) => {
    try {
        await photoService.updatePhoto(req.params.id, req.body);

        res.json({});
    } catch (err) {
        res.status(400).json(err);
    }
};

export const deletePhoto = async (req, res) => {
    try {
        await photoService.deletePhoto(req.params.id);

        res.json({});
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getAllPhotosByUserId = async (req, res) => {
    try {
        const photos = await photoService.getAllPhotosByUserId(req.params.id);

        res.json(photos);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getAllTags = async (req, res) => {
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
};

export const getPhotoById = async (req, res) => {
    try {
        const photo = await photoService.getPhotoById(req.params.id);

        res.json(photo);
    } catch (err) {
        res.status(404).json(err);
    }
};

export const getPhotoByTag = async (req, res) => {
    try {
        const photo = await photoService.getPhotoByTag(req.params.tag);

        res.json(photo);
    } catch (err) {
        res.status(404).json(err);
    }
};
