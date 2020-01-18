const mongoose = require('mongoose');
const Schema = mongoose.Schema,

    schema = new Schema({
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
    });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Support', schema);
