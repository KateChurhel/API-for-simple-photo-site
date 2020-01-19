require('rootpath')();
const express = require('express'),
    cors = require( 'cors'),
    bodyParser = require('body-parser'),
    router = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(403).json({ message: 'You need to be authorized to access this operation.' });

        return;
    }

    next();
});

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${ port}`);
});
