import { EMAIL, PASSWORD } from '../constants/support';

const db = require('src/helpers/db');
const Support = db.Support;
const nodemailer = require('nodemailer');


async function sendEmail(params) {
    const message = new Support(params);

    await message.save();
    try {
        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD,
                },
            }),

            mailOptions = {
                from: EMAIL,
                to: EMAIL,
                subject: 'I need help!',
                html: `<p><b>email:</b> ${params.email}</p><p><b>message:</b> ${params.message}</p>`,
            };

        return await transporter.sendMail(mailOptions);
    } catch (e) {
        throw { message: 'Cannot send email' };
    }
}

module.exports = { sendEmail };
