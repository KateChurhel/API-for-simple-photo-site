const db = require('src/helpers/db');
const Photo = db.Photo,

    getAllPhotos = async () => {
        return await Photo.find();
    },

    getAllPhotosByUserId = async (id) => {
        return await Photo.find({ userId: id });
    },

    getPhotoById = async (id) => {
        try {
            return await Photo.findById(id);
        } catch (e) {
            throw { message: 'Photo not found' };
        }
    },

    create = async (photoParam) => {
        if (await Photo.findOne({ image: photoParam.image })) {
            throw { message: 'Image is already exist!' };
        }

        const photo = new Photo(photoParam);

        await photo.save();

        return photo;
    },

    updatePhoto = async (id, photoParam) => {
        const photo = await Photo.findById(id);

        if (!photo) {
            throw { message: 'Photo not found!' };
        }
        if (photo.image !== photoParam.image && await Photo.findOne({ image: photoParam.image })) {
            throw { message: 'Image is already exist!' };
        }

        Object.assign(photo, photoParam);

        await photo.save();
    },

    deletePhoto = async (id) => {
        await Photo.findByIdAndRemove(id);
    },

    getPhotoByTag = async (tag) => {
        try {
            const landlord = await Photo.find({});
            return await landlord.filter(photo => photo.tags.includes(tag));
        } catch (e) {
            throw { message: 'Tag not found' };
        }
    };

module.exports = {
    getAllPhotos,
    getAllPhotosByUserId,
    getPhotoById,
    getPhotoByTag,
    create,
    deletePhoto,
    updatePhoto,
};
