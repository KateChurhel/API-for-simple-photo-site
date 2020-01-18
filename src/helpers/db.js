const config = require('../../config/config'),
    mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../model/user'),
    Photo: require('../model/photo'),
    Support: require('../model/support'),
};
