const mongoose = require('mongoose');
const Schema = mongoose.Schema,

    schema = new Schema({
        image: {
            type: String,
            unique: true,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        user: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
    });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Photo', schema);
