import db from 'src/helpers/db';
const Photo = db.Photo;

export const getAllPhotos = async () => {
    return await Photo.find();
};

export const getAllPhotosByUserId = async (id) => {
    return await Photo.find({ userId: id });
};

export const getPhotoById = async (id) => {
    try {
        const photo = await Photo.findById(id);
        return photo;
    } catch (e) {
        throw { message: 'Photo not found' };
    }
};

export const create = async (photoParam) => {
    if (await Photo.findOne({ image: photoParam.image })) {
        throw { message: 'Image is already exist!' };
    }

    const photo = new Photo(photoParam);

    await photo.save();

    return photo;
};

export const updatePhoto = async (id, photoParam) => {
    const photo = await Photo.findById(id);

    if (!photo) {
        throw { message: 'Photo not found!' };
    }
    if (photo.image !== photoParam.image && await Photo.findOne({ image: photoParam.image })) {
        throw { message: 'Image is already exist!' };
    }

    Object.assign(photo, photoParam);

    await photo.save();
};

export const deletePhoto = async (id) => {
    await Photo.findByIdAndRemove(id);
};

export const getPhotoByTag = async (tag) => {
    try {
        const landlord = await Photo.find({});
        return await landlord.filter(photo => photo.tags.includes(tag));
    } catch (e) {
        throw { message: 'Tag not found' };
    }
};
