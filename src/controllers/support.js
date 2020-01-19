const supportService = require('../services/support'),
    express = require( 'express');
const router = express.Router(),

    SendEmails = async (req, res) => {
        try {
            const photo = await supportService.sendEmail(req.body);

            res.json(photo);
        } catch (err) {
            res.status(400).json(err);
        }
    };


router.post('/send-email', SendEmails);

module.exports = router;
