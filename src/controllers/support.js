import * as supportService from '../services/support';

export const SendEmails = async (req, res) => {
    try {
        const photo = await supportService.sendEmail(req.body);

        res.json(photo);
    } catch (err) {
        res.status(400).json(err);
    }
};
